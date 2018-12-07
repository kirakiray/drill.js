((glo) => {
    // common
    // 进度寄存器
    const processors = new Map();
    // 加载寄存器
    const loaders = new Map();
    // 地址寄存器
    const bag = new Map();

    window.bag = bag;

    // 映射资源
    const paths = new Map();

    // 映射目录
    const dirpaths = {};

    // 基础数据对象
    let base = {
        processors,
        loaders,
        bag,
        paths,
        dirpaths,
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
        let urlArr = url.match(/(.+\/).+/);
        return urlArr && urlArr[1];
    };

    // main
    // processors添加普通文件加载方式
    processors.set("file", (packData) => {
        // 直接修改完成状态
        packData.stat = 3;
    });
    processors.set("define", async (packData) => {
        let d = base.tempM.d;

        let exports = {},
            module = {
                exports
            };

        // 根据内容填充函数
        if (isFunction(d)) {
            let {
                path
            } = packData;

            // 函数类型
            d = d((...args) => {
                return load(toUrlObjs(args, packData.dir));
            }, exports, module, {
                FILE: path,
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

        // 修正getPack方法
        packData.getPack = async () => {
            return d;
        }

        // 修正状态
        packData.stat = 3;
    });
    processors.set("task", (packData) => {
        let d = base.tempM.d;

        // 判断d是否函数
        if (!isFunction(d)) {
            throw 'task must be a function';
        }

        // 修正getPack方法
        packData.getPack = async (urlData) => {
            let reData = await d((...args) => {
                return load(toUrlObjs(args, urlData.dir));
            }, urlData.data, {
                FILE: urlData.path,
            });

            return reData;
        }

        // 修正状态
        packData.stat = 3;
    });

    // loaders添加js加载方式
    loaders.set("js", (packData) => {
        // 主体script
        let script = document.createElement('script');

        let path = packData.path;

        //填充相应数据
        script.type = 'text/javascript';
        script.async = true;
        path && (script.src = path);

        // 添加事件
        script.addEventListener('load', () => {
            // 根据tempM数据设置type
            let {
                tempM
            } = base;

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
                process(packData);
            } else {
                throw "no such this processor => " + type;
            }

            // 清空tempM
            base.tempM = {};
        });
        script.addEventListener('error', () => {
            // 进行processors断定
            debugger
            script
        });

        // 添加进主体
        document.head.appendChild(script);
    });

    // 代理加载
    // 根据不同加载状态进行组装
    let agent = (urlObj) => {
        // 根据url获取资源状态
        let packData = bag.get(urlObj.path);

        if (!packData) {
            // 加载状态
            // 1加载中
            // 2加载错误
            // 3加载完成
            let stat = 1;

            packData = {
                get stat() {
                    return stat;
                },
                set stat(d) {
                    // 记录旧状态
                    let oldStat = stat;

                    // 一样的值就别瞎折腾
                    if (oldStat == d) {
                        return;
                    }

                    // set
                    stat = d;

                    // 改动stat的时候触发changes内的函数
                    this.changes.forEach(callback => callback({
                        change: "stat",
                        oldStat,
                        stat
                    }));
                },
                path: urlObj.path,
                dir: urlObj.dir,
                // 改动事件记录器
                changes: new Set(),
                // 记录装载状态
                fileType: urlObj.fileType,
                // 包的getter函数
                // 包加载完成时候，有特殊功能的，请替换掉async getPack函数
                async getPack(urlObj) {}
            };

            // 设置包数据
            bag.set(urlObj.path, packData);

            // 立即请求包处理
            let loader = loaders.get(urlObj.fileType);

            if (loader) {
                // 存在Loader的话，进行加载
                loader(packData)
            } else {
                throw "no such this loader => " + packData.fileType;
            }
        }

        return new Promise((res, rej) => {
            // 根据状态进行处理
            switch (packData.stat) {
                case 1:
                    // 添加状态改动callback，确认加载完成的状态后，进行callback
                    let statChangeCallback;
                    packData.changes.add(statChangeCallback = (d) => {
                        // 获取改动状态
                        let {
                            stat
                        } = d;

                        if (stat == 3) {
                            // 加载完成，运行getPack函数
                            packData.getPack(urlObj).then(res);

                            // 清除自身callback
                            packData.changes.delete(statChangeCallback);
                            packData = null;
                        }
                    });
                    break;
                case 2:
                    debugger
                    break;
                case 3:
                    nextTick(() => {
                        // 已经加载完成的，直接获取
                        packData.getPack(urlObj).then(res);
                    });
                    break;
            }
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

            urlObjs.forEach(async (e, i) => {
                // 中转加载资源
                let d = await agent(e);

                // 设置数据
                reValue[i] = d;

                // 触发pending
                pendFunc && pendFunc({
                    // 当前所处id
                    id: i,
                    // 总数
                    sum,
                    ready: sum - length + 1,
                    stat: 1
                });

                // 计时减少
                length--;

                if (!length) {
                    // 单个的话直接返回单个的数据
                    if (sum == 1) {
                        res(d);
                    } else {
                        res(reValue);
                    }
                    reValue = null;
                }
            });
        });

        // 挂载两个方法
        p.post = function (data) {
            urlObjs.forEach(e => e.data = data);
            return this;
        };
        p.pend = function (func) {
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

        if (param.includes('-pack')) {
            let pathArr = path.match(/(.+)\/(.+)/);
            if (2 in pathArr) {
                ori = path = pathArr[1] + "/" + pathArr[2] + "/" + pathArr[2];
            }
        }

        // 判断是否有基于根目录参数
        if (param.indexOf('-r') > -1 || /^.+:\/\//.test(ori)) {
            path = ori;
        } else if (/^\./.test(ori)) {
            if (urlObj.relative) {
                // 添加相对路径
                path = urlObj.relative + ori;
            } else {
                path = ori.replace(/^\.\//, "");
            }
        } else {
            // 添加相对目录，得出资源地址
            path = base.baseUrl + ori;
        }

        // 修正单点
        path = path.replace(/\/\.\//, "/");

        // 修正两点（上级目录）
        if (/\.\.\//.test(path)) {
            path = removeParentPath(path);
        }

        // 添加后缀
        path += "." + fileType;

        // 根据资源地址计算资源目录
        let dir = getDir(path);

        Object.assign(urlObj, {
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
    let toUrlObjs = (args, relative) => {
        // 生成组id
        let groupId = getRandomId();

        // 转化成urlObj
        return args.map(url => fixUrlObj({
            loadId: getRandomId(),
            str: url,
            groupId,
            relative
        }));
    }

    const drill = {
        load(...args) {
            return load(toUrlObjs(args));
        },
        remove(url) {
            debugger
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
        },
        define(d, moduleId) {
            base.tempM = {
                type: "define",
                d,
                moduleId
            };
        },
        task(d, moduleId) {
            base.tempM = {
                type: "task",
                d,
                moduleId
            };
        },
        cacheInfo: {
            k: "",
            v: ""
        }
    };

    // init 
    glo.load || (glo.load = drill.load);
    glo.define || (glo.define = drill.define);
    glo.task || (glo.task = drill.task);

    // 初始化版本号
    let cScript = document.currentScript;
    !cScript && (cScript = document.querySelector(['drill-cache']));

    if (cScript) {
        let cacheVersion = cScript.getAttribute('drill-cache');
        cacheVersion && (drill.cacheInfo.v = cacheVersion);
    }

    // 判断全局是否存在变量 drill
    let gloDrill = glo.drill;

    // 定义全局drill
    Object.defineProperty(glo, 'drill', {
        get: () => drill,
        set(func) {
            if (isFunction(func)) {
                func(drill);
            } else {
                console.error('drill type error =>', func);
            }
        }
    });

    // 执行全局的 drill函数
    gloDrill && gloDrill(drill);
})(window);