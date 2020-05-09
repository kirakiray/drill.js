const drill = {
    load(...args) {
        return load(toUrlObjs(args));
    },
    remove(url) {
        let {
            path
        } = fixUrlObj({
            str: url
        });

        if (bag.has(path)) {
            bag.delete(path);

            //告示删除成功
            return !0;
        } else {
            console.warn(`pack %c${url}`, "color:red", `does not exist`);
        }
    },
    has(url) {
        let {
            path
        } = fixUrlObj({
            str: url
        });

        let packData = bag.get(path);

        return packData && packData.stat;
    },
    config(options) {
        options.baseUrl && (base.baseUrl = options.baseUrl);

        //配置paths
        let oPaths = options.paths;
        oPaths && Object.keys(oPaths).forEach(i => {
            if (/\/$/.test(i)) {
                //属于目录类型
                dirpaths[i] = {
                    // 正则
                    reg: new RegExp('^' + i),
                    // 值
                    value: oPaths[i]
                };
            } else {
                //属于资源类型
                paths.set(i, oPaths[i]);
            }
        });

        // 后备仓
        if (base.baseUrl && options.backups) {
            options.backups.forEach(url => errInfo.backups.push(url));
        }
    },
    // 扩展开发入口
    ext(f_name, func) {
        if (isFunction(f_name)) {
            f_name(base);
        } else {
            // 旧的方法
            let oldFunc;

            // 中间件方法
            let middlewareFunc = (...args) => func(args, oldFunc, base);

            switch (f_name) {
                case "fixUrlObj":
                    oldFunc = fixUrlObj;
                    fixUrlObj = middlewareFunc;
                    break;
                case "load":
                    oldFunc = load;
                    load = middlewareFunc;
                    break;
                case "agent":
                    oldFunc = agent;
                    agent = middlewareFunc;
                    break;
            }
        }
    },
    cacheInfo: {
        k: "d_ver",
        v: "",
        // 默认不缓存到本地
        offline: false
    },
    debug: {
        bag
    },
    version: "{{version}}",
    v: "{{versionCode}}"
};