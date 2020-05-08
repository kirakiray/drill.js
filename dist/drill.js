/*!
 * drill.js v3.3.0
 * https://github.com/kirakiray/drill.js
 * 
 * (c) 2018-2020 YAO
 * Released under the MIT License.
 */
((glo) => {
    "use strict";
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

    // 错误处理数据
    let errInfo = {
        // 每个错误资源的最大错误请求次数
        // 默认错误的时候回再请求3次
        loadNum: 3,
        // 加载错误之后，再次加载的间隔时间(毫秒)
        time: 1000,
        // baseUrl后备仓
        backups: new Set()
    };

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

    // function
    // 获取随机id
    const getRandomId = () => Math.random().toString(32).substr(2);
    var objectToString = Object.prototype.toString;
    var getType = value => objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
    const isFunction = d => getType(d).search('function') > -1;
    var isEmptyObj = obj => !(0 in Object.keys(obj));

    //改良异步方法
    const nextTick = (() => {
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
        let urlArr = url.match(/(.+\/).*/);
        return urlArr && urlArr[1];
    };

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

    // 获取根目录地址
    const rootHref = getDir(document.location.href);

    // loaders添加css
    loaders.set("css", (packData) => {
        return new Promise((res, rej) => {
            // 给主体添加css
            let linkEle = document.createElement('link');
            linkEle.rel = "stylesheet";
            linkEle.href = packData.link;

            linkEle.onload = () => {
                res();
            }

            linkEle.onerror = () => {
                rej();
            }

            // 添加到head
            document.head.appendChild(linkEle);
        });
    });

    // loaders添加json支持
    loaders.set("json", async (packData) => {
        let data = await fetch(packData.link);;

        // 转换json格式
        data = await data.json();

        // 重置getPack
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

        // 重置getPack
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

                // 清空tempM
                base.tempM = {};

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
    const getLoader = (fileType) => {
        // 立即请求包处理
        let loader = loaders.get(fileType);

        if (!loader) {
            console.log("no such this loader => " + fileType);
            loader = getByUtf8;
        }

        return loader;
    }

    // 获取并通过utf8返回数据
    const getByUtf8 = async packData => {
        let data;
        try {
            // 请求数据
            data = await fetch(packData.link);
        } catch (e) {
            packData.stat = 2;
            return;
        }
        // 转换json格式
        data = await data.text();

        // 重置getPack
        packData.getPack = async () => {
            return data;
        }

        // 设置完成
        packData.stat = 3;
    }

    let agent = async (urlObj) => {
        // 根据url获取资源状态
        let packData = bag.get(urlObj.path);

        if (!packData) {
            packData = {
                // 加载状态
                // 1加载中
                // 2加载错误，重新装载中
                // 3加载完成
                // 4彻底加载错误，别瞎折腾了
                stat: 1,
                // 路径相关信息
                dir: urlObj.dir,
                path: urlObj.path,
                link: urlObj.link,
                // 记录装载状态
                fileType: urlObj.fileType,
                // 包的getter函数
                // 包加载完成时候，有特殊功能的，请替换掉async getPack函数
                // async getPack(urlObj) { }
            };

            // 设置包数据
            bag.set(urlObj.path, packData);

            // let canBreak = false;
            // while (!canBreak) { }
            try {
                // 立即请求包处理
                packData.getPack = (await getLoader(urlObj.fileType)(packData)) || (async () => {});
            } catch (e) {
                // 重新加载包
                debugger
            }
        }

        // 获取数据并返回
        return await packData.getPack(urlObj);
    }

    // 代理加载
    // 根据不同加载状态进行组装
    // let agent_backup = (urlObj) => {
    //     // 根据url获取资源状态
    //     let packData = bag.get(urlObj.path);

    //     if (!packData) {
    //         // 加载状态
    //         // 1加载中
    //         // 2加载错误，重新装载中
    //         // 3加载完成
    //         // 4彻底加载错误，别瞎折腾了
    //         let stat = 1;

    //         packData = {
    //             get stat() {
    //                 return stat;
    //             },
    //             set stat(d) {
    //                 // 记录旧状态
    //                 let oldStat = stat;

    //                 // set
    //                 stat = d;

    //                 // 改动stat的时候触发changes内的函数
    //                 this.changes.forEach(callback => callback({
    //                     change: "stat",
    //                     oldStat,
    //                     stat
    //                 }));
    //             },
    //             dir: urlObj.dir,
    //             path: urlObj.path,
    //             link: urlObj.link,
    //             dir: urlObj.dir,
    //             // 改动事件记录器
    //             changes: new Set(),
    //             // 记录装载状态
    //             fileType: urlObj.fileType,
    //             // 包的getter函数
    //             // 包加载完成时候，有特殊功能的，请替换掉async getPack函数
    //             async getPack(urlObj) { }
    //         };

    //         // 设置包数据
    //         bag.set(urlObj.path, packData);

    //         // 立即请求包处理
    //         getLoader(urlObj.fileType)(packData);
    //     }

    //     return new Promise((res, rej) => {
    //         // 根据状态进行处理
    //         switch (packData.stat) {
    //             case 2:
    //             // 加载错误的重新装载，也加入队列
    //             case 1:
    //                 // 添加状态改动callback，确认加载完成的状态后，进行callback
    //                 let statChangeCallback;
    //                 packData.changes.add(statChangeCallback = (d) => {
    //                     // 获取改动状态
    //                     let {
    //                         stat
    //                     } = d;

    //                     switch (stat) {
    //                         case 3:
    //                             // 加载完成，运行getPack函数
    //                             packData.getPack(urlObj).then(res);

    //                             // 清除自身callback
    //                             packData.changes.delete(statChangeCallback);
    //                             packData = null;
    //                             break;
    //                         case 2:
    //                             // 重新装载
    //                             // 获取计数器
    //                             let loadCount = (packData.loadCount != undefined) ? packData.loadCount : (packData.loadCount = 0);

    //                             // 存在次数
    //                             if (loadCount < errInfo.loadNum) {
    //                                 // 递增
    //                                 packData.loadCount++;

    //                                 // 重新装载
    //                                 setTimeout(() => getLoader(packData.fileType)(packData), errInfo.time);
    //                             } else {
    //                                 // 查看有没有后备仓
    //                                 let {
    //                                     backups
    //                                 } = errInfo;

    //                                 // 确认后备仓
    //                                 if (backups.size) {
    //                                     // 查看当前用了几个后备仓
    //                                     let backupId = (packData.backupId != undefined) ? packData.backupId : (packData.backupId = -1);
    //                                     if (backupId < backups.size) {
    //                                         // 转换数组
    //                                         let barr = Array.from(backups);
    //                                         let oldBaseUrl = barr[backupId] || packData.dir;

    //                                         // 递增backupId
    //                                         backupId = ++packData.backupId;
    //                                         let newBaseUrl = barr[backupId];

    //                                         // 修正数据重新载入
    //                                         packData.loadCount = 1;
    //                                         packData.link = packData.link.replace(new RegExp("^" + oldBaseUrl), newBaseUrl);

    //                                         // 重新装载
    //                                         setTimeout(() => getLoader(packData.fileType)(packData), errInfo.time);
    //                                         return;
    //                                     }
    //                                 }
    //                                 // 载入不进去啊大佬，别费劲了
    //                                 packData.stat = 4;
    //                             }

    //                             break;
    //                         case 4:
    //                             rej("source error");
    //                             break;
    //                     }
    //                 });
    //                 break;
    //             case 3:
    //                 nextTick(() => {
    //                     // 已经加载完成的，直接获取
    //                     packData.getPack(urlObj).then(res);
    //                 });
    //                 break;
    //             case 4:
    //                 // 彻底加载错误的资源，就别瞎折腾了
    //                 rej("source error");
    //                 break;
    //         }
    //     });
    // }
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
                options.backups.forEach(url => {
                    errInfo.backups.add(url);
                });
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
            v: ""
        },
        debug: {
            bag
        },
        version: "3.3.0",
        v: 3003000
    };
    // 设置加载器
    let setProcessor = (processName, processRunner) => {
        processors.set(processName, async (packData) => {
            return await processRunner(packData, base.tempM.d);
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

                // 判断是否有getPath参数
                if (obj.param && obj.param.includes("-getPath")) {
                    d = obj.link;
                } else {
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
                }

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
            str
        } = urlObj;

        // 判断是否注册在bag上的直接的id
        if (bag.has(str)) {
            let tarBag = bag.get(str);
            Object.assign(urlObj, {
                path: tarBag.path,
                link: tarBag.link,
                dir: tarBag.dir
            });
            return urlObj;
        }

        // 拆分空格数据
        let ndata = str.split(/\s/).filter(e => e && e);

        let param = ndata.slice(1);

        // 第一个参数是路径名
        let ori = ndata[0];

        // 拆分问号(?)后面的 url param
        let search = ori.match(/(.+)\?(\S+)$/) || "";
        if (search) {
            ori = search[1];
            search = search[2];
        }
        // 判断是否要加版本号
        let {
            k,
            v
        } = drill.cacheInfo;
        if (k && v) {
            search && (search += "&");
            search += k + '=' + v;
        }

        // 查看是否有映射路径
        let tarpath = paths.get(ori);
        if (tarpath) {
            ori = tarpath;
        } else {
            // 查看是否有映射目录
            // 判断是否注册目录
            for (let i in dirpaths) {
                let tar = dirpaths[i];
                if (tar.reg.test(ori)) {
                    ori = ori.replace(tar.reg, tar.value);
                    break
                }
            }
        }

        // 得出fileType
        let fileType = getFileType(ori) || "js";

        // ori去掉后缀
        ori = ori.replace(new RegExp('\\.' + fileType + "$"), "");

        // 主体path
        let path;

        // 判断是否有基于根目录参数
        if (param.indexOf('-r') > -1 || /^.+:\/\//.test(ori)) {
            path = ori;
        } else if (/^\./.test(ori)) {
            if (urlObj.relative) {
                // 添加相对路径
                path = ori = urlObj.relative + ori
                // path = urlObj.relative + ori;
            } else {
                path = ori.replace(/^\.\//, "");
            }
        } else {
            // 添加相对目录，得出资源地址
            path = base.baseUrl + ori;
        }

        // 判断是否带有 -pack 参数
        if (param.includes('-pack')) {
            let pathArr = path.match(/(.+)\/(.+)/);
            if (pathArr && (2 in pathArr)) {
                ori = path = pathArr[1] + "/" + pathArr[2] + "/" + pathArr[2];
            } else {
                ori = path = `${path}/${path}`
            }
        }

        // 判断不是协议开头的，加上当前的根目录
        if (!/^.+:\/\//.test(path)) {
            path = rootHref + path;
        }

        // 修正单点
        path = path.replace(/\/\.\//, "/");
        ori = ori.replace(/\/\.\//, "/");

        // 修正两点（上级目录）
        if (/\.\.\//.test(path)) {
            path = removeParentPath(path);
            ori = removeParentPath(ori);
        }

        // 添加后缀
        path += "." + fileType;

        // 根据资源地址计算资源目录
        let dir = getDir(path);

        // 写入最终请求资源地址
        let link = search ? (path + "?" + search) : path;

        Object.assign(urlObj, {
            link,
            search,
            ori,
            fileType,
            path,
            dir,
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
        // packData.stat = 3;
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

        // 修正getPack方法
        // packData.getPack = async () => {
        //     return d;
        // }

        // 修正状态
        // packData.stat = 3;
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

        // 修正状态
        // packData.stat = 3;
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

        // 修正状态
        // packData.stat = 3;
    });


    // 挂载主体方法
    let mainFunObj = {
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
    };
    Object.defineProperty(base, "main", {
        value: mainFunObj
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