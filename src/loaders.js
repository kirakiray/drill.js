const loaders = new Map();

// 添加加载器的方法
const addLoader = (type, callback) => {
    loaders.set(type, src => {
        const record = bag.get(src)

        record.type = type;

        callback({
            src,
            record
        });
    });
}

addLoader("js", ({ src, record }) => {
    return new Promise((resolve, reject) => {
        // 主体script
        let script = document.createElement('script');

        //填充相应数据
        script.type = 'text/javascript';
        script.async = true;
        script.src = src;

        // 挂载script元素
        record.sourceElement = script;

        // 添加事件
        script.addEventListener('load', async () => {
            // 添加脚本完成时间
            record.loadedTime = Date.now();

            // 判断资源是否有被设置加载中或完成的状态
            if (record.status == 0) {
                record.ptype = "script";

                // 未进入 1 或 2 状态，代表是普通js文件，直接执行done
                record.done((pkg) => { });
            }

            resolve();
        });
        script.addEventListener('error', () => {
            // 加载错误
            reject();
        });

        // 添加进主体
        document.head.appendChild(script);
    });
});

addLoader("mjs", async ({ src, record }) => {
    let d = await import(src);

    record.done(() => d);
});

addLoader("wasm", async ({ src, record }) => {
    let data = await fetch(src).then(e => e.arrayBuffer());

    // 转换wasm模块
    let module = await WebAssembly.compile(data);
    const instance = new WebAssembly.Instance(module);

    record.done(() => instance.exports)
});

addLoader("json", async ({ src, record }) => {
    let data = await fetch(src);

    // 转换json格式
    data = await data.json();

    record.done(() => data);
});

addLoader("css", async ({ src, record }) => {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = src;

    // 挂载元素
    record.sourceElement = link;

    let isAppend = false;

    record.done(async (pkg) => {
        if (pkg.params.includes("-unpull")) {
            // 带unpull直接返回
            return link;
        }

        // 默认情况下会添加到body，并且不返回值
        if (!isAppend) {
            document.head.appendChild(link);
            isAppend = true;
        }

        // 未加载完成的话要等待
        if (!link.sheet) {
            await new Promise((resolve) => {
                link.addEventListener("load", e => {
                    resolve();
                });
            })
        }
    });
});

// 获取并通过utf8返回数据
const loadByFetch = async ({ src, record }) => {
    let data = await fetch(src);

    // 重置getPack
    record.done(() => data);
}
