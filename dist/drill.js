/*!
 * drill.js v3.5.3
 * https://github.com/kirakiray/drill.js
 * 
 * (c) 2018-2020 YAO
 * Released under the MIT License.
 */
((glo) => {
    "use strict";


    // function
    // 获取随机id
    const getRandomId = () => Math.random().toString(32).substr(2);
    var objectToString = Object.prototype.toString;
    var getType = value => objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
    const isFunction = d => getType(d).search('function') > -1;
    var isEmptyObj = obj => !(0 in Object.keys(obj));

    //改良异步方法
    const nextTick = (() => {
        if ((typeof $ !== "undefined") && (typeof $.nextTick !== "undefined")) {
            return $.nextTick;
        }
        if (document.currentScript.getAttribute("debug") !== null) {
            return setTimeout;
        }

        if (typeof process === "object" && process.nextTick) {
            return process.nextTick;
        }

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

    // 获取文件类型
    const getFileType = url => {
        let lastOri = url.split('/').pop();
        let fileType;
        let sArr = lastOri.match(/(.+)\.(.+)/);
        if (sArr) {
            // 得出文件类型
            fileType = sArr[2];
        }
        return fileType;
    };

    // 获取目录名
    const getDir = url => {
        url = url.replace(/(.+)#.+/, "$1");
        url = url.replace(/(.+)\?.+/, "$1");
        let urlArr = url.match(/(.+\/).*/);
        return urlArr && urlArr[1];
    };



    /**
     * 将相对路径写法改为绝对路径（协议开头）
     * @param {String} path 需要修正的路径
     * @param {String} relativeDir 相对目录
     */
    const getFullPath = (path, relativeDir) => {
        !relativeDir && (relativeDir = getDir(document.location.href));

        let new_path = path;

        // 如果不是协议开头，修正relativeDir
        if (!/^.+:\/\//.test(relativeDir)) {
            relativeDir = getDir(getFullPath(relativeDir));
        }

        // 不是绝对路径（协议+地址）的话进行修正
        if (!/^.+:\/\//.test(path)) {
            if (/^\/.+/.test(path)) {
                // 基于根目录
                new_path = location.origin + path;
            } else {
                // 基于相对路径
                new_path = relativeDir + path;
            }
        }

        return new_path;
    }

    //修正字符串路径
    const removeParentPath = (url) => {
        let urlArr = url.split(/\//g);
        let newArr = [];
        urlArr.forEach((e) => {
            if (e == '..' && newArr.length && (newArr.slice(-1)[0] != "..")) {
                newArr.pop();
                return;
            }
            newArr.push(e);
        });
        return newArr.join('/');
    };

    // common
    // 处理器（针对js类型）
    const processors = new Map();
    // 加载器（针对文件类型）
    const loaders = new Map();
    // 地址寄存器
    const bag = new Map();

    // 映射资源
    const paths = new Map();

    // 映射目录
    const dirpaths = {};

    // 是否离线
    let offline = false;
    // offline模式下，对文件的特殊处理
    const cacheDress = new Map();

    // 错误处理数据
    let errInfo = {
        // 加载错误之后，再次加载的间隔时间(毫秒)
        time: 100,
        // baseUrl后备仓
        backups: []
    };

    // 资源根路径
    let baseUrl = getDir(location.href);

    // 基础数据对象
    let base = {
        processors,
        loaders,
        bag,
        paths,
        dirpaths,
        errInfo,
        // 根目录
        baseUrl: "",
        // 临时挂起的模块对象
        tempM: {}
    };
    // loaders添加css
    loaders.set("css", (packData) => {
        return new Promise((res, rej) => {
            // 给主体添加css
            let linkEle = document.createElement('link');
            linkEle.rel = "stylesheet";
            linkEle.href = packData.link;

            let isAddLink = false;

            linkEle.onload = async () => {
                // import rule 的文件也要缓存起来
                document.head.removeChild(linkEle);

                res(async (e) => {
                    // 在有获取内容的情况下，才重新加入link
                    // 有unAppend参数，代表不需要添加到body内
                    if (!isAddLink && !e.param.includes("-unAppend")) {
                        isAddLink = true;
                        document.head.appendChild(linkEle);
                    }
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
    // 必须只是 async import 才可以使用
    try {
        eval(`
    loaders.set("mjs", async packData => {
        let d = await import(packData.link);

        return async () => {
            return d;
        }
    });
    `)
    } catch (e) {
        console.warn(`browser does not support asynchronous es module`);
    }
    // 直接返回缓存地址的类型
    const returnUrlSets = new Set(["png", "jpg", "jpeg", "bmp", "gif", "webp"]);

    const getLoader = (fileType) => {
        // 立即请求包处理
        let loader = loaders.get(fileType);

        if (!loader) {
            // console.log("no such this loader => " + fileType);
            loader = getByUtf8;
        }

        // 判断是否图片
        if (returnUrlSets.has(fileType)) {
            loader = getByUrl;
        }

        return loader;
    }

    // 获取并通过utf8返回数据
    const getByUtf8 = async packData => {
        let data = await fetch(packData.link);

        // 转换text格式
        data = await data.text();

        // 重置getPack
        return async () => {
            return data;
        }
    }

    // 返回内存的地址
    const getByUrl = async packData => {
        // 判断是否已经在缓存内
        if (packData.offlineUrl) {
            return async () => {
                return packData.offlineUrl;
            }
        }

        let data = await fetch(packData.link);

        let fileBlob = await data.blob();

        let url = URL.createObjectURL(fileBlob);

        return async () => {
            return url;
        }
    }

    const isHttpFront = str => /^http/.test(str);

    /**
     * 加载包
     */
    class PackData {
        constructor(props) {
            Object.assign(this, props);

            // 包的getter函数
            // 包加载完成时候，有特殊功能的，请替换掉async getPack函数
            // async getPack(urlObj) { }

            // 加载状态
            // 1加载中
            // 2加载错误，重新装载中
            // 3加载完成
            // 4彻底加载错误，别瞎折腾了
            this.stat = 1;

            // 等待通行的令牌
            this.passPromise = new Promise((res, rej) => {
                this._passResolve = res;
                this._passReject = rej;
            });

            // 错误路径地址
            this.errPaths = [];
        }

        // 获取当前path的目录
        get dir() {
            return getDir(this.path);
        }

        // 获取备份path
        get nextLink() {
            // 获取备份path的同时，相当于进入等待重载的状态
            this.stat = 2;

            let backupId = (this._backupId != undefined) ? ++this._backupId : (this._backupId = 0);


            let {
                backups
            } = errInfo;

            // 获取旧的base
            let oldBase = backups[backupId - 1] || base.baseUrl;

            // 获取下一个backup地址
            let nextBase = backups[backupId];

            if (!nextBase) {
                return;
            }

            let oldBaseStr = getFullPath(oldBase);
            let nextBaseStr = getFullPath(nextBase);

            this.errPaths.push(this.link);

            let link = this.link.replace(oldBaseStr, nextBaseStr);

            this.link = link;

            return link;
        }

        // 设置成功
        resolve(getPack) {
            this.getPack = getPack;
            this.stat = 3;
            this._passResolve();
        }

        // 通告pack错误
        reject() {
            this.stat = 4;
            this._passReject({
                desc: `load source error`,
                link: this.errPaths,
                packData: this
            });
        }
    }

    let agent = async (urlObj) => {
        // getLink直接返回
        if (urlObj.param && (urlObj.param.includes("-getLink")) && !offline) {
            return Promise.resolve(urlObj.link);
        }

        // 根据url获取资源状态
        let packData = bag.get(urlObj.path);

        if (!packData) {
            packData = new PackData({
                path: urlObj.path,
                link: urlObj.link,
                // 记录装载状态
                fileType: urlObj.fileType,
            });

            // 设置包数据
            bag.set(urlObj.path, packData);

            // 存储错误资源地址
            while (true) {
                try {
                    // 文件link中转
                    packData.link = await cacheSource({
                        packData
                    });

                    // 返回获取函数
                    let getPack = (await getLoader(urlObj.fileType)(packData)) || (async () => {});
                    packData.resolve(getPack);
                    break;
                } catch (e) {
                    packData.stat = 2;
                    if (isHttpFront(urlObj.str)) {
                        // http引用的就别折腾
                        packData.reject();
                        break;
                    }

                    // 获取下一个链接
                    let nextBackupLink = packData.nextLink;

                    if (!nextBackupLink) {
                        packData.reject();
                        break;
                    }

                    // 等待重试
                    await new Promise(res => setTimeout(res, errInfo.time));
                }
            }
        }

        // 等待通行证
        await packData.passPromise;

        // 在offline情况下，返回link
        if (urlObj.param && (urlObj.param.includes("-getLink")) && offline) {
            return Promise.resolve(packData.link);
        }

        return await packData.getPack(urlObj);
    }
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
                let val = oPaths[i];
                if (/^@.+\/$/.test(i)) {
                    let regStr = "^" + i;

                    // 修正单点
                    val = val.replace(/\/\.\//, "/")

                    // 如果修正相对目录 
                    if (/^\.\./.test(val)) {
                        val = removeParentPath(getDir(document.location.href) + base.baseUrl + val);
                    } else if (/^\//.test(val)) {
                        val = location.origin + val;
                    }

                    let reg = new RegExp(regStr);

                    //属于目录类型
                    dirpaths[i] = {
                        // 正则
                        reg,
                        // 值
                        value: val
                    };
                } else if (/^\w+$/.test(i)) {
                    //属于资源类型
                    paths.set(i, val);
                } else {
                    console.warn("this Paths settings do not meet specifications", i);
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
                    case "cacheSource":
                        oldFunc = cacheSource;
                        cacheSource = middlewareFunc;
                        break;
                }
            }
        },
        cacheInfo: {
            k: "d_ver",
            v: ""
        },
        // 是否离线
        get offline() {
            return offline;
        },
        set offline(val) {
            if (offline) {
                console.error("offline mode has been activated");
                return;
            }
            offline = val;
        },
        debug: {
            bag
        },
        version: "3.5.3",
        v: 3005003
    };
    // 设置类型加载器的函数
    const setProcessor = (processName, processRunner) => {
        processors.set(processName, async (packData) => {
            let tempData = base.tempM.d;
            // 提前清空
            base.tempM = {};
            return await processRunner(packData, tempData, {
                // 相对的加载函数
                relativeLoad(...args) {
                    return load(toUrlObjs(args, packData.dir));
                }
            });
        });

        // 特定类型记录器
        let processDefineFunc = (d, moduleId) => {
            base.tempM = {
                type: processName,
                d,
                moduleId
            };
        }

        drill[processName] || (drill[processName] = processDefineFunc);
        glo[processName] || (glo[processName] = processDefineFunc);
    }

    // 设置缓存中转器的函数
    const setCacheDress = (cacheType, dressRunner) => {
        cacheDress.set(cacheType, async ({
            file,
            packData
        }) => {
            let newFile = file;

            // 解析为文本
            let backupFileText = await file.text();

            let fileText = await dressRunner({
                fileText: backupFileText,
                file,
                relativeLoad: (...args) => {
                    return load(toUrlObjs(args, packData.dir));
                }
            });

            if (backupFileText !== fileText) {
                // 重新生成file
                newFile = new File([fileText], file.name, {
                    type: file.type
                });
            }

            return newFile;
        });
    }

    // 主体加载函数
    let load = (urlObjs) => {
        let pendFunc;
        let p = new Promise((res, rej) => {
            // 要返回的数据
            let reValue = [];

            // 获取原来的长度
            let {
                length
            } = urlObjs;
            let sum = length;

            // 是否有出错
            let hasError = [];

            urlObjs.forEach(async (obj, i) => {
                // 载入的状态
                let stat = "succeed";

                // 中转加载资源
                let d;

                // 等待一次异步操作，确保post数据完整
                await new Promise(res => nextTick(res))

                d = await agent(obj).catch(e => {
                    stat = "error";
                    Object.assign(obj, {
                        type: "error",
                        descript: e
                    });
                    hasError.push(obj);
                });

                // 设置数据
                reValue[i] = d;

                // 触发pending
                pendFunc && pendFunc({
                    // 当前所处id
                    id: i,
                    // 总数
                    sum,
                    ready: sum - length + 1,
                    stat
                });

                // 计时减少
                length--;

                if (!length) {
                    if (!hasError.length) {
                        // 单个的话直接返回单个的数据
                        if (sum == 1) {
                            res(d);
                        } else {
                            res(reValue);
                        }
                    } else {
                        // 出错了
                        rej(hasError);
                    }
                    reValue = null;
                }
            });
        });

        // 挂载两个方法
        p.post = function(data) {
            urlObjs.forEach(e => e.data = data);
            return this;
        };
        p.pend = function(func) {
            pendFunc = func;
            return this;
        };

        return p;
    }

    // 转换出url字符串对象
    let fixUrlObj = (urlObj) => {
        let {
            // 最初的输入文本，千万不能覆盖这个值
            str,
            // 相对目录
            relative
        } = urlObj;

        // 判断是否注册在bag上的直接的id
        if (bag.has(str)) {
            let tarBag = bag.get(str);
            Object.assign(urlObj, {
                path: tarBag.path,
                link: tarBag.link,
            });
            return urlObj;
        }

        let
            // 挂载在bag上的链接key
            path,
            // 最终加载的链接
            link,
            // 链接上的search数据
            search,
            // 加载文件的类型
            fileType,
            // 空格拆分后的参数
            param;

        // 拆分空格数据
        [path, ...param] = str.split(/\s/).filter(e => e && e);

        // 抽离search数据
        search = path.match(/(.+)\?(\S+)$/) || "";
        if (search) {
            path = search[1];
            search = search[2];
        }

        // 查看是否有映射路径
        let tarPath = paths.get(path);
        if (tarPath) {
            // 映射路径修正
            path = tarPath;
        } else {
            // 映射目录修正
            for (let i in dirpaths) {
                let tar = dirpaths[i];
                if (tar.reg.test(path)) {
                    path = path.replace(tar.reg, tar.value);
                    break
                }
            }
        }

        // 确保是绝对路径
        if (!/^.+:\/\//.test(path)) {
            // 判断是否有基于根目录参数
            if (param.includes('-r')) {
                path = getFullPath(path);
            } else if (/^\./.test(path)) {
                // 获取修正后的地址
                path = getFullPath(path, relative || base.baseUrl);
            } else {
                path = getFullPath(path, base.baseUrl);
            }
        }

        // 修正无用单点路径
        path = path.replace(/\/\.\//, "/");

        // 修正两点（上级目录）
        if (/\.\.\//.test(path)) {
            path = removeParentPath(path);
        }

        // 得出fileType
        fileType = getFileType(path);

        if (!fileType) {
            // 空的情况下
            if (!/\/$/.test(path)) {
                if (param.includes('-p')) {
                    // 带包修正
                    path = path + "/" + path.replace(/.+\/(.+)/, "$1");
                }

                // 判断不是 / 结尾的，加上js修正
                path += ".js";
                fileType = "js";
            }
        }

        // 写入最终请求资源地址
        link = search ? (path + "?" + search) : path;

        {
            // 判断是否要加版本号
            let {
                k,
                v
            } = drill.cacheInfo;
            if (k && v && !param.includes("-unCacheSearch")) {
                if (link.includes("?")) {
                    link = `${link}&${k}=${v}`;
                } else {
                    link = `${link}?${k}=${v}`;
                }
            }
        }

        // 对 -mjs 参数修正
        if (param.includes("-mjs")) {
            fileType = "mjs";
        }

        Object.assign(urlObj, {
            // 真正的访问地址
            link,
            // 后置参数
            search,
            // 加载类型
            fileType,
            // 挂载地址
            path: path.replace(location.origin, ""),
            // 空格参数
            param
        });

        return urlObj;
    }

    // 轻转换函数
    const toUrlObjs = (args, relative) => {
        // 生成组id
        let groupId = getRandomId();

        // 转化成urlObj
        return args.map((url, id) => fixUrlObj({
            loadId: getRandomId(),
            id,
            str: url,
            groupId,
            relative
        }));
    }
    // processors添加普通文件加载方式
    processors.set("file", (packData) => {
        // 直接修改完成状态，什么都不用做
    });

    // 添加define模块支持
    setProcessor("define", async (packData, d, {
        relativeLoad
    }) => {
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
            d = d(relativeLoad, exports, module, {
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
    setProcessor("task", (packData, d, {
        relativeLoad
    }) => {
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
            let reData = await d(relativeLoad, urlData.data, {
                FILE: path,
                DIR: dir
            });

            return reData;
        }
    });

    // 添加init模块支持
    setProcessor("init", (packData, d, {
        relativeLoad
    }) => {
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
            redata = await d(relativeLoad, urlData.data, {
                FILE: path,
                DIR: dir
            });

            // 设置已运行
            isRun = 1;

            return redata;
        }
    });

    // 设置 css 缓存中转，对css引用路径进行修正
    setCacheDress("css", async ({
        fileText,
        relativeLoad
    }) => {
        // 获取所有import字符串
        let importArrs = fileText.match(/@import ["'](.+?)["']/g);
        if (importArrs) {
            // 缓存外部样式
            await Promise.all(importArrs.map(async e => {
                let path = e.replace(/@import ["'](.+?)["']/, "$1");

                let link = await relativeLoad(`${path} -getLink`);

                // 修正相应路径
                fileText = fileText.replace(e, `@import "${link}"`);
            }));
        }

        // 缓存外部资源
        let urlArrs = fileText.match(/url\((.+?)\)/g);
        if (urlArrs) {
            await Promise.all(urlArrs.map(async e => {
                // 获取资源路径
                let path = e.replace(/url\((.+?)\)/, "$1").replace(/["']/g, "");

                // 确定不是协议http|https的才修正
                if (/(^http:)|(^https:)/.test(path)) {
                    return Promise.resolve("");
                }

                let link = await relativeLoad(`${path} -getLink`);

                // 修正相应路径
                fileText = fileText.replace(e, `url("${link}")`);
            }));
        }

        return fileText;
    });

    // 对mjs引用路径进行修正
    setCacheDress("mjs", async ({
        fileText,
        relativeLoad
    }) => {
        // import分组获取
        let importsArr = fileText.match(/import .+ from ['"](.+?)['"];/g)

        if (importsArr) {
            await Promise.all(importsArr.map(async e => {
                let exArr = e.match(/(import .+ from) ['"](.+?)['"];/, "$1");

                if (exArr) {
                    let path = exArr[2];

                    // 获取对应的链接地址
                    let link = await relativeLoad(`${path} -getLink`);

                    fileText = fileText.replace(e, `${exArr[1]} "${link}"`);
                }
            }))
        }

        let asyncImports = fileText.match(/import\(.+?\)/g);
        if (asyncImports) {
            await Promise.all(asyncImports.map(async e => {
                let path = e.replace(/import\(["'](.+?)['"]\)/, "$1");
                let link = await relativeLoad(`${path} -getLink`);

                fileText = fileText.replace(e, `import("${link}")`);
            }));
        }

        return fileText;
    });
    const DBNAME = "drill-cache-db";
    const FILESTABLENAME = 'files';

    // 主体Database对象
    let mainDB;
    // 未处理的队列
    let isInitDB = new Promise((initDBResolve, reject) => {
        const indexedDB = glo.indexedDB || glo.webkitIndexedDB || glo.mozIndexedDB || glo.msIndexedDB;

        // 初始化数据库
        if (indexedDB) {
            // 初始打开
            let openRequest = indexedDB.open(DBNAME, drill.cacheInfo.v || 1);
            openRequest.onupgradeneeded = (e) => {
                // 升级中（初始化中）的db触发事件，db不暴露出去的
                let db = e.target.result;

                // 判断是否存在表
                // 判断是否存在
                if (!db.objectStoreNames.contains(FILESTABLENAME)) {
                    // 建立存储对象空间
                    db.createObjectStore(FILESTABLENAME, {
                        keyPath: "path"
                    });
                } else {
                    // 存在的话先删除
                    db.deleteObjectStore(FILESTABLENAME);

                    // 重新创建
                    db.createObjectStore(FILESTABLENAME, {
                        keyPath: "path"
                    });
                }
            };

            // 初始成功触发的callback
            openRequest.onsuccess = (e) => {
                // 挂载主体db
                mainDB = e.target.result;

                // 确认初始化
                initDBResolve();
            }
        } else {
            reject("rubish browser no indexDB");
        }
    });

    // 加载离线或者数据库文件数据
    // 每个路径文件，要确保只加载一次
    // blobCall 用于扩展程序二次更改使用
    let cacheSource = async ({
        packData
    }) => {
        // 离线处理
        if (!offline) {
            return packData.link;
        }

        // 等待数据库初始化完成
        await isInitDB;

        // 先从数据库获取数据
        let file = await getFile(packData.path);

        if (!file) {
            // 没有的话就在线下载
            // 请求链接内容
            let p = await fetch(packData.link);

            if (p.status != 200) {
                // 清空状态
                // 加载失败，抛出错误
                throw {
                    type: "cacheSource",
                    desc: "statusError",
                    status: p.status
                };
            }

            // 生成file前的两个重要数据
            let type = p.headers.get('Content-Type').replace(/;.+/, "");
            let fileName = packData.path.replace(/.+\//, "");

            // 生成file格式
            let blob = await p.blob();

            // 生成file
            file = new File([blob], fileName, {
                type
            })

            // 存储到数据库中
            await saveFile(packData.path, file);
        }

        // file经由cacheDress中转
        let dresser = cacheDress.get(packData.fileType);
        if (dresser) {
            file = await dresser({
                file,
                packData
            });
        }

        // 挂载file文件
        packData.offlineFile = file;

        // 生成url
        let tempUrl = packData.offlineUrl = URL.createObjectURL(file);

        return tempUrl;
    }


    // 获取数据方法
    const getFile = path => new Promise((res, rej) => {
        // 新建事务
        var t = mainDB.transaction([FILESTABLENAME], "readonly");
        let store = t.objectStore(FILESTABLENAME);
        let req = store.get(path);
        req.onsuccess = () => {
            res(req.result && req.result.data);
        }
        req.onerror = (e) => {
            rej();
            console.error(`error load ${path}`, e);
        }
    });

    // 保存数据
    const saveFile = (path, file) => new Promise((res, rej) => {
        // 新建事务
        var t = mainDB.transaction([FILESTABLENAME], "readwrite");
        let store = t.objectStore(FILESTABLENAME);
        let req = store.put({
            path,
            data: file
        });
        req.onsuccess = () => {
            res({
                stat: 1
            });
            console.log(`save ${path} succeed`);
        };
        req.onerror = (e) => {
            res({
                stat: 0
            })
            console.error(`save (${path}) error`, e);
        };
    });

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