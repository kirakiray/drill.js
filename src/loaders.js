// loaders添加css
loaders.set("css", (packData) => {
    return new Promise((res, rej) => {
        // 给主体添加css
        let linkEle = document.createElement('link');
        linkEle.rel = "stylesheet";
        linkEle.href = packData.link;

        linkEle.onload = () => {
            res(async (e) => {
                return linkEle
            });
        }

        linkEle.onerror = (e) => {
            rej({
                desc: "load link error",
                target: linkEle,
                event: e
            });
        }

        // 添加到head
        document.head.appendChild(linkEle);
    });
});

// loaders添加json支持
loaders.set("json", async (packData) => {
    let data = await fetch(packData.link);

    // 转换json格式
    data = await data.json();

    return async () => {
        return data;
    }
});

// loaders添加wasm支持
loaders.set("wasm", async (packData) => {
    let data = await fetch(packData.link);

    // 转换arrayBuffer格式
    data = await data.arrayBuffer();

    // 转换wasm模块
    let module = await WebAssembly.compile(data);
    const instance = new WebAssembly.Instance(module);

    return async () => {
        return instance.exports;
    }
});

// loaders添加iframe辅助线程支持
loaders.set("frame", async (packData) => {
    // 新建iframe
    let iframeEle = document.createElement("iframe");

    // 设置不可见样式
    Object.assign(iframeEle.style, {
        position: "absolute",
        "z-index": "-1",
        border: "none",
        outline: "none",
        opacity: "0",
        width: "0",
        height: "0"
    });

    // 转换并获取真实链接
    let {
        link,
        path
    } = packData;

    // 更新path
    let newPath = path.replace(/\.frame$/, "/frame.html");

    // 更新link
    let newLink = link.replace(path, newPath);

    // 设置链接
    iframeEle.src = newLink;

    // taskID记录器
    let taskIDs = new Map();

    // 添加计时器，当计算都完成时，计时10秒内，没有传入参数操作，就进行回收进程
    let clearer = () => {
        // 清除对象
        bag.delete(path);

        // 去除iframe
        document.body.removeChild(iframeEle);

        // 去除message监听
        window.removeEventListener("message", messageFun);

        // 快速内存回收
        messageFun = packData = clearer = null;
    };
    packData.timer = setTimeout(clearer, 10000);

    // 设置getPack函数
    let getPack = (urlData) => new Promise(res => {
        // 计算taskId
        let taskId = getRandomId();

        // 清除计时器
        clearTimeout(packData.timer);

        // 添加taskID和相应函数
        taskIDs.set(taskId, {
            res
        });

        // 发送数据过去
        iframeEle.contentWindow.postMessage({
            type: "drillFrameTask",
            taskId,
            data: urlData.data
        }, '*');
    })

    // 在 windows上设置接收器
    let messageFun;
    window.addEventListener("message", messageFun = e => {
        let {
            data,
            taskId
        } = e.data;

        // 判断是否在taskID内
        if (taskIDs.has(taskId)) {
            // 获取记录对象
            let taskObj = taskIDs.get(taskId);

            // 去除taskID
            taskIDs.delete(taskId);

            // 返回数据
            taskObj.res(data);
        }

        // 当库存为0时，计时清理函数
        if (!taskIDs.size) {
            packData.timer = setTimeout(clearer, 10000);
        }
    });

    return new Promise((res, rej) => {
        // 加载完成函数
        iframeEle.addEventListener('load', e => {
            res(getPack);
        });

        // 错误函数
        iframeEle.addEventListener('error', e => {
            clearer();
            rej();
        });

        // 添加到body
        document.body.appendChild(iframeEle);
    });
});

// loaders添加js加载方式
loaders.set("js", (packData) => {
    return new Promise((resolve, reject) => {
        // 主体script
        let script = document.createElement('script');

        //填充相应数据
        script.type = 'text/javascript';
        script.async = true;
        script.src = packData.link;

        // 添加事件
        script.addEventListener('load', async () => {
            // 根据tempM数据设置type
            let {
                tempM
            } = base;

            let getPack;

            // type:
            // file 普通文件类型
            // define 模块类型
            // task 进程类型
            let {
                type,
                moduleId
            } = tempM;

            // 判断是否有自定义id
            if (moduleId) {
                bag.get(moduleId) || bag.set(moduleId, packData);
            }

            // 进行processors断定
            // 默认是file类型
            let process = processors.get(type || "file");

            if (process) {
                getPack = await process(packData);
            } else {
                throw "no such this processor => " + type;
            }

            resolve(getPack);
        });
        script.addEventListener('error', () => {
            // 加载错误
            reject();
        });

        // 添加进主体
        document.head.appendChild(script);
    });
});

// 对es6 module 支持
loaders.set("mjs", async packData => {
    let d = await import(packData.link);

    return async () => {
        return d;
    }
});