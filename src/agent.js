// So the information about the file exists on this object
const bag = new Map();

const setBag = (src, record) => {
    let o = new URL(src);
    bag.set(o.origin + o.pathname, record);
};

const getBag = (src) => {
    let o = new URL(src);
    return bag.get(o.origin + o.pathname);
};

class BagRecord {
    constructor(src) {
        this.src = src;
        // 0 Loading
        // 1 Loaded resources successfully (but dependencies not completed)
        // 2 Loading completed
        // -1 Load failure
        this.status = 0;
        this.bid = "b_" + getRandomId();

        // getPack函数的存放处
        this.data = new Promise((res, rej) => {
            this.__resolve = res;
            this.__reject = rej;
        });

        this.startTime = Date.now();
    }

    // 完成设置
    done(data) {
        this.status = 2;
        this.__resolve(data);

        delete this.__resolve;
        delete this.__reject;

        this.doneTime = Date.now();
    }

    fail(err) {
        this.status = -1;
        this.__reject(data);

        delete this.__resolve;
        delete this.__reject;

        this.doneTime = Date.now();
    }
}

const notfindLoader = {};

// 代理资源请求
async function agent(pkg) {
    let record = getBag(pkg.src);

    if (record) {
        if (record.status == -1) {
            throw {
                expr: pkg.url,
                src: record.src,
            };
        }

        const getPack = await record.data;

        return await getPack(pkg);
    }

    record = new BagRecord(pkg.src);

    setBag(pkg.src, record);

    // 根据后缀名获取loader
    let loader = loaders.get(pkg.ftype);

    try {
        if (loader) {
            // 加载资源
            await loader(record.src);
        } else {
            if (!notfindLoader[pkg.ftype]) {
                // 不存在这种加载器
                console.warn({
                    desc: "did not find this loader",
                    type: pkg.ftype,
                });

                notfindLoader[pkg.ftype] = 1;
            }

            // loadByUtf8({
            await loadByFetch({
                src: record.src,
                record,
            });
        }
    } catch (err) {
        record.fail(err);
    }

    // 返回数据
    const getPack = await record.data;

    return await getPack(pkg);
}
