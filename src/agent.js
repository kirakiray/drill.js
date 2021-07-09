// 所以文件的存储仓库
const bag = new Map();

// 背包记录器
class BagRecord {
    constructor(src) {
        this.src = src;
        // 0 加载中
        // 1 加载资源成功（但依赖未完成）
        // 2 加载完成
        // -1 加载失败
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
}

// 代理资源请求
async function agent(pkg) {
    let record = bag.get(pkg.src);

    if (record) {
        const getPack = await record.data;

        return await getPack(pkg);
    }

    record = new BagRecord(pkg.src);

    bag.set(pkg.src, record);

    // 根据后缀名获取loader
    let loader = loaders.get(pkg.ftype);

    if (loader) {
        // 加载资源
        await loader(record.src);
    } else {
        // 不存在这种加载器
        console.warn({
            desc: "did not find this loader",
            type: pkg.ftype
        });

        // loadByUtf8({
        await loadByFetch({
            src: record.src,
            record
        });
    }

    // 返回数据
    const getPack = await record.data;

    return await getPack(pkg);
}