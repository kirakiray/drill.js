drill.extend((baseResources, R) => {
    console.log('扩展成功', baseResources, R);

    //改良异步方法
    const windowHead = document.head;
    var nextTick = (() => {
        let isTick = false;
        let nextTickArr = [];
        return (fun) => {
            if (!isTick) {
                isTick = true;
                setTimeout(() => {
                    for (let i = 0; i < nextTickArr.length; i++) {
                        nextTickArr[i]();
                    }
                    nextTickArr = [];
                    isTick = false;
                }, 0);
            }
            nextTickArr.push(fun);
        };
    })();

    // 旧的方法
    let old_loadscript = R.loadScript;

    // 数据寄存对象
    var instantData = {};

    // 替换主体方法
    R.loadScript = url => {
        // 存在就直接读取
        if (instantData[url]) {
            let old_url = url;
            url = instantData[url];
            delete instantData[old_url];
            let script = document.createElement('script');

            //填充相应数据
            script.type = 'text/javascript';
            script.async = true;
            script.src = url;

            //ie10对 async支持差的修正方案
            nextTick(() => {
                windowHead.appendChild(script);
            });

            return script;
        } else {
            // 没就直接继承旧方法
            return old_loadscript.call(R, url);
        }
    };

    // 本地设置模块方法
    drill.setModule = (path, b64) => {
        instantData[path] = b64;
    };
});