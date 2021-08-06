// 针对js类型的进程处理操作
const processor = new Map();

// 添加进程类型的方法
const addProcess = (name, callback) => {
    processor.set(name, callback);

    defineProperties(glo, {
        [name]: {
            value: (respone) => {
                let nowSrc = document.currentScript.src;

                // 查看原来是否有record
                let record = getBag(nowSrc);

                if (!record) {
                    record = new BagRecord(nowSrc);
                    setBag(nowSrc, record);
                }

                // 设置加载中的状态
                record.status = 1;

                record.ptype = name;

                callback({
                    respone, record, relativeLoad(...args) {
                        let repms = new Drill(...args);

                        // 设置相对目录
                        repms.__relative__ = nowSrc;

                        return repms;
                    }
                });
            }
        }
    });
}

// 最初始的模块类型 define
addProcess("define", async ({ respone, record, relativeLoad }) => {
    // 完整的获取函数
    let getPack;

    if (isFunction(respone)) {
        const exports = {};

        // 先运行返回结果
        let result = await respone({
            load: relativeLoad,
            FILE: record.src,
            exports
        });

        // 没有放回结果并且exports上有数据
        if (result === undefined && !isEmptyObj(exports)) {
            result = exports;
        }

        getPack = (pkg) => {
            return result;
        }
    } else {
        // 直接赋值result
        getPack = (pkg) => {
            return respone;
        }
    }

    // 返回getPack函数
    record.done(getPack);
});

// 进程模块
addProcess("task", async ({ respone, record, relativeLoad }) => {
    if (!isFunction(respone)) {
        throw 'task must be a function';
    }

    record.done(async (pkg) => {
        return await respone({
            data: pkg.data,
            load: relativeLoad,
            FILE: record.src,
        });
    });
});