((glo) => {
    "use strict";
    //<!--public-->
    //<!--main-->

    // 挂载主体方法
    Object.defineProperty(base, "main", {
        value: {
            get agent() {
                return agent;
            },
            get load() {
                return load;
            },
            get fixUrlObj() {
                return fixUrlObj;
            },
            get toUrlObjs() {
                return toUrlObjs;
            },
            get setProcessor() {
                return setProcessor;
            }
        }
    });

    // init 
    glo.load || (glo.load = drill.load);

    // 初始化版本号
    let cScript = document.currentScript;
    !cScript && (cScript = document.querySelector(['drill-cache']));

    if (cScript) {
        let cacheVersion = cScript.getAttribute('drill-cache');
        cacheVersion && (drill.cacheInfo.v = cacheVersion);
    }

    // 判断全局是否存在变量 drill
    let oldDrill = glo.drill;

    // 定义全局drill
    Object.defineProperty(glo, 'drill', {
        get: () => drill,
        set(func) {
            if (isFunction(func)) {
                nextTick(() => func(drill));
            } else {
                console.error('drill type error =>', func);
            }
        }
    });

    // 执行全局的 drill函数
    oldDrill && nextTick(() => oldDrill(drill));
})(window);