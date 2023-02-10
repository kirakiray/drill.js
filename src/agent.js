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

        // repository of the getPack function
        this.data = new Promise((res, rej) => {
            this.__resolve = res;
            this.__reject = rej;
        });

        this.startTime = Date.now();
    }

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

// Agent resource requests
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

    // Get loader by suffix name
    let loader = loaders.get(pkg.ftype);

    try {
        if (loader) {
            // Loading resource
            await loader(record.src);
        } else {
            if (!notfindLoader[pkg.ftype]) {
                // No such loader exists
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

    const getPack = await record.data;

    return await getPack(pkg);
}
