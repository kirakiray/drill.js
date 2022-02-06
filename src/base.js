((glo) => {
    "use strict";
    //<!--public-->
    //<!--processor-->
    //<!--loaders-->
    //<!--agent-->
    //<!--distribution-->
    //<!--main-->

    const load = (glo.load = (...args) => new Drill(...args));

    const config = (opts) => {
        let { paths } = opts;
        if (paths) {
            // 快捷路径
            Object.keys(paths).forEach((k) => {
                let val = paths[k];

                // 不是@开头/结尾的定义为不合法
                if (!/^@.+\/$/.test(k)) {
                    throw {
                        desc: "incorrect definition of paths",
                        key: k,
                    };
                }

                if (!/.+\/$/.test(k)) {
                    throw {
                        desc: "incorrect definition of paths",
                        key: k,
                        path: val,
                    };
                }

                // pathsMap.set(k, val);
                pathsMap.set(new RegExp(`^` + k), val);
            });
        }
    };

    const drill = {
        load,
        config,
        // 是否已加载该资源
        async has(src) {
            let path = await load(`${src} -link`);

            return !!getBag(path);
        },
        // 删除该资源缓存
        async remove(src) {
            let path = await load(`${src} -link`);
            let record = getBag(path);

            // 删除挂载元素
            let sele = record.sourceElement;
            if (sele) {
                sele.parentNode.removeChild(sele);
            }

            // 删除缓存数据
            bag.delete(path);
        },
        // 二次开发扩展方法
        ext(callback) {
            callback({
                bag,
                addLoader,
                addProcess,
            });
        },
        bag,
        // 版本信息
        version: "{{version}}",
        v: "{{versionCode}}",
    };

    // 全局函数
    defineProperties(glo, {
        drill: {
            value: drill,
        },
    });
})(typeof globalThis != "undefined" ? globalThis : window);
