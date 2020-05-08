// processors添加普通文件加载方式
processors.set("file", (packData) => {
    // 直接修改完成状态，什么都不用做
});

// 添加define模块支持
setProcessor("define", async (packData, d) => {
    let exports = {},
        module = {
            exports
        };

    // 根据内容填充函数
    if (isFunction(d)) {
        let {
            path,
            dir
        } = packData;

        // 函数类型
        d = d((...args) => {
            return load(toUrlObjs(args, dir));
        }, exports, module, {
            FILE: path,
            DIR: dir
        });
    }

    // Promise函数
    if (d instanceof Promise) {
        // 等待获取
        d = await d;
    }

    // 判断值是否在 exports 上
    if (!d && !isEmptyObj(module.exports)) {
        d = module.exports;
    }

    return async () => {
        return d;
    };
});

// 添加task模块支持
setProcessor("task", (packData, d) => {
    // 判断d是否函数
    if (!isFunction(d)) {
        throw 'task must be a function';
    }

    let {
        path,
        dir
    } = packData;

    // 修正getPack方法
    return async (urlData) => {
        let reData = await d((...args) => {
            return load(toUrlObjs(args, dir));
        }, urlData.data, {
            FILE: path,
            DIR: dir
        });

        return reData;
    }
});

// 添加init模块支持
setProcessor("init", (packData, d) => {
    // 判断d是否函数
    if (!isFunction(d)) {
        throw 'init must be a function';
    }

    let {
        path,
        dir
    } = packData;

    let isRun = 0;
    let redata;

    // 修正getPack方法
    return async (urlData) => {
        if (isRun) {
            return redata;
        }

        // 等待返回数据
        redata = await d((...args) => {
            return load(toUrlObjs(args, dir));
        }, urlData.data, {
            FILE: path,
            DIR: dir
        });

        // 设置已运行
        isRun = 1;

        return redata;
    }
});
