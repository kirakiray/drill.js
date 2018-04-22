((glo) => {
    "use strict";
    // common
    // 映射资源
    let paths = {};

    // 映射目录
    let dirpaths = {};

    // 载入状态路径映射对象
    let bag = {};

    // 加载器（针对文件类型）
    let loaders = {};

    // 处理器（针对js类型）
    let processor = {};

    // 错误处理数据
    let errInfo = {
        // 每个错误资源的最大错误请求次数
        // 默认错误的时候回再请求2次
        loadNum: 2,
        // 加载错误之后，再次加载的间隔时间(毫秒)
        time: 2000
    };

    //基础数据对象
    let baseResources = {
        paths,
        dirpaths,
        //  js模块相对路径
        baseUrl: "",
        bag,
        // 临时挂起的模块对象
        tempM: {}
    };

    glo.baseResources = baseResources;

    // function
    //改良异步方法
    const nextTick = (() => {
        let isTick = false;
        let nextTickArr = [];
        return fun => {
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
            return fun;
        };
    })();
    //获取目录名
    const getDir = url => {
        let urlArr = url.match(/(.+\/).+/);
        return urlArr && urlArr[1];
    };
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
    //修正字符串路径
    var removeParentPath = (url) => {
        let urlArr = url.split(/\//g);
        let newArr = [];
        each(urlArr, (e) => {
            if (e == '..' && newArr.length && (newArr.slice(-1)[0] != "..")) {
                newArr.pop();
                return;
            }
            newArr.push(e);
        });
        return newArr.join('/');
    };

    // 返回Promise实例
    const promise = func => new Promise(func);
    // 数组each
    const each = (arr, func) => arr.forEach(func);
    const {
        assign,
        defineProperty,
        keys
    } = Object;
    //获取类型
    var objectToString = Object.prototype.toString;
    var getType = value => objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
    var isFunction = d => getType(d).search('function') > -1;
    // 获取随机id
    var getRandomId = () => Math.random().toString(32).substr(2);
    var isEmptyObj = obj => !(0 in keys(obj));

    // Class
    // 状态记录器类
    class DrillStat {
        constructor(fileType) {
            assign(this, {
                // 待办列表
                tobe: [],
                fileType,
                // 默认是空的获取函数
                get: async () => {},
                // stat监听函数存放列表
                _sl: []
            });

            // 默认状态是2（加载中）
            let stat = 2;
            defineProperty(this, 'stat', {
                set(val) {
                    // 触发_sl
                    each(this._sl, e => e(val, this._stat));
                    stat = val;
                },
                get: () => stat
            });
        }
        statChange(func) {
            this._sl.push(func);
        }
    }

    // main
    /**
     * 初步简单拆分url数据，将url字符串转换为object
     * 按空格拆分数组，第二个数开始是附加参数
     */
    const analyzeUrl = str => {
        // 拆分空格数据
        let ndata = str.split(/\s/).filter(e => e && e);

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

        // 加载错误时间和间隔时间
        let {
            loadNum
        } = errInfo;
        let errLoadTime = errInfo.time;

        // 返回数据
        return {
            // 最初是字符串
            str,
            // 资源地址
            ori,
            // url参数
            search,
            // 空格组参数
            param: ndata.slice(1),
            // 加载次数
            loadNum,
            // 加载时间
            errLoadTime,
            // 握手数据
            // 框架内没有使用握手数据，主要方便外部插件使用
            hand: {
                rid: getRandomId()
            }
        };
    };

    /**
     * 修正地址，得出path
     * analyzeUrl负责拆分数据，这个负责重新整理映射map地址
     * 修正当前目录是否相对根目录
     * 修正paths映射地址
     * 根据path得出fileType
     */
    const fixPath = urlData => {
        let {
            ori
        } = urlData;

        // 查看是否有映射路径
        let tarpath = paths[ori];
        if (tarpath) {
            ori = tarpath;
        } else {
            // 查看是否有映射目录
            // 判断是否注册目录
            for (let i in dirpaths) {
                let tar = dirpaths[i];
                let tarreg = tar.r;
                if (tarreg.test(ori)) {
                    ori = ori.replace(tarreg, tar.v);
                    break
                }
            }
        }

        // 得出fileType
        let fileType = getFileType(ori);

        // 查看loader内是否存在这个类型
        if (!fileType || !loaders[fileType]) {
            fileType = 'js';
        }

        urlData.fileType = fileType;

        // ori去掉后缀
        ori = ori.replace(new RegExp('\\.' + fileType + "$"), "")

        // 主体path
        let path = ori;

        // 判断是否有基于根目录参数
        if (urlData.param.indexOf('-r') > -1) {
            // debugger
        } else if (urlData.rel && /^\./.test(path)) {
            // 添加相对路径
            path = urlData.rel + path;
        } else {
            // 添加相对目录，得出资源地址
            path = baseResources.baseUrl + path;
        }

        // 修正单点
        path = path.replace(/\/\.\//, "/");

        // 修正两点（上级目录）
        if (/\.\.\//.test(path)) {
            path = removeParentPath(path);
        }

        // 添加后缀
        path += "." + urlData.fileType;

        urlData.path = path;

        // 根据资源地址计算资源目录
        urlData.dir = getDir(path);

        return urlData;
    };

    /**
     * 加载资源前的代理操作
     * 如果加载过就直接返回内存里的数据
     */
    const loadAgent = urlData => promise((res, rej) => {
        let {
            path
        } = urlData;
        let tar = bag[path];

        if (!tar) {
            tar = bag[path] = new DrillStat(urlData.fileType);

            // 错误加载次数
            let {
                loadNum
            } = urlData;

            // 加载资源
            let loadfun = () => {
                loadSource(urlData).then(statData => {
                    // 合并模块数据
                    assign(tar, statData.o);

                    if (statData.stat == 1) {
                        // 确认加载完成
                        tar.stat = 1;

                        // 运行历史函数
                        each(tar.tobe, e => {
                            e.res();
                        });
                    } else {
                        // 还有加载次数
                        if (loadNum) {
                            // 设置错误状态
                            tar.stat = 4;

                            // 递减
                            loadNum--;

                            setTimeout(() => {
                                loadfun();
                            }, urlData.errLoadTime);
                            return;
                        }

                        // 加载出错
                        tar.stat = statData.stat;
                        each(tar.tobe, e => {
                            // 返回错误信息
                            console.error(statData.stat + " " + statData.msg);
                            e.rej();
                        });

                        // 清空
                        delete bag[path];
                    }

                    // 清空
                    delete tar.tobe;
                    loadfun = null;
                })
            }
            loadfun();
        }

        // 要返回的数据
        let reData;

        /**
         * 状态说明
         * 1 加载完成
         * 2 加载中（资源未加载完毕）
         * 3 加载中（资源已加载完毕，正在等候确认）
         * 4 加载中（资源加载错误，正在重新加载）
         */
        switch (tar.stat) {
            case 1:
                // 加载完成
                tar.get(urlData).then(res);
                break;
            case 2:
            case 3:
            case 4:
                // 等待数据
                tar.tobe.push({
                    res() {
                        tar.get(urlData).then(res)
                    },
                    rej
                });
                break;
            default:
                // 其他状态一律是错误
                debugger
        }
    })

    /**
     * 加载资源
     * 资源判断，js文件就进行loadjs
     */
    const loadSource = async urlData => {
        let statData;
        let {
            fileType
        } = urlData;
        // 主体加载js类型
        if (fileType === "js") {
            statData = await loadJS(urlData);
        } else if (loaders[fileType]) {
            // 加载其他文件类型
            statData = await loaders[fileType](urlData);
        } else {
            // 不能加载这种文件类型
            statData = {
                stat: 100,
                msg: `no this fileType => .` + urlData.fileType
            };
        }
        return statData;
    }

    /**
     * 加载js资源
     * 默认包含 file define task 三种类型
     * file 普通文件类型
     * define 模块类型
     * task 进程类型
     */
    const loadJS = async urlData => {
        // 获取状态信息
        let statData = await loadScript(urlData);

        // 获取临时数据
        let {
            tempM
        } = baseResources;
        let {
            type
        } = tempM;

        if (type) {
            // 设置类型
            statData.o.jsType = type;

            // 设置状态
            bag[urlData.path].stat = 3;

            let sData;
            switch (type) {
                case "define":
                    sData = await setDefine(urlData);
                    break;
                case "task":
                    sData = await setTask(urlData);
                    break;
                default:
                    let tarProcessor = processor[type];
                    if (tarProcessor) {
                        sData = await tarProcessor(urlData);
                    }
            }

            // 设置get函数
            assign(statData.o, sData);

        } else {
            // 默认都会当成file类型
            statData.o.jsType = "file";
        }

        // 返回状态信息
        return statData;
    };

    /**
     * 加载 script
     */
    const loadScript = urlData => promise(res => {
        let {
            path,
            search
        } = urlData;
        search && (path = path + "?" + search);

        // 主体script
        let script = document.createElement('script');

        //填充相应数据
        script.type = 'text/javascript';
        script.async = true;
        path && (script.src = path);

        // 添加事件
        script.addEventListener('load', () => {
            res({
                stat: 1,
                // 最终合并到bag
                o: {
                    script
                }
            });
        });

        script.addEventListener('error', (e) => {
            // 加载错误就删掉script
            document.head.removeChild(script);

            res({
                stat: 404,
                msg: "load js file error => " + urlData.path,
                o: {}
            });
        });

        // 载入主体
        // polyfill后 ie10 bug
        nextTick(() => {
            document.head.appendChild(script);
        });
    });

    // 生成内部用的require
    let getInRequire = (dir, hand) => (...args) => require(args.map(e => {
        e = analyzeUrl(e)

        // 添加相对目录
        e.rel = dir;

        // 握手数据
        e.parHand = hand;

        return fixPath(e);
    }));

    // 设置define模块
    const setDefine = async urlData => {
        // 获取临时数据
        let {
            d
        } = baseResources.tempM;

        // 清空tempM
        baseResources.tempM = {};

        let exports = {},
            module = {
                exports
            };

        // 根据内容填充函数
        if (isFunction(d)) {
            let {
                dir,
                hand,
                path
            } = urlData;

            // 函数类型
            d = d(getInRequire(dir, hand), exports, module, {
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

        // 返回 get函数
        return {
            get: async () => d
        };
    }

    // 设置task模块
    const setTask = async urlData => {
        // 获取临时数据
        let {
            tempM
        } = baseResources;
        let {
            d
        } = tempM;

        // 判断d是否函数
        if (!isFunction(d)) {
            throw 'drill\'s task must be a function';
        }

        // 清空tempM
        baseResources.tempM = {};

        // 直接设置函数
        return {
            get: async (urlData) => {
                let {
                    dir,
                    hand,
                    path,
                    data
                } = urlData;

                let p = d(getInRequire(dir, hand), data, {
                    FILE: path,
                    DIR: dir
                });

                return await p;
            }
        };
    }

    /**
     * 主体require方法
     * 负责组装基础业务
     */
    const require = (urlObjs) => {
        // pend函数寄存
        let pendFunc;

        let p = promise((res, rej) => {
            nextTick(() => {
                let len = urlObjs.length;
                let sum = len;
                switch (len) {
                    case 0:
                        // 空的你还引用干嘛
                        throw ('no resource path');
                    case 1:
                        // 单个直接返回
                        loadAgent(urlObjs[0]).then(d => {
                            pendFunc && pendFunc({
                                id: 0,
                                sum,
                                // 成功
                                stat: 1
                            });
                            res(d);
                        }).catch(e => {
                            rej();
                        });
                        break;
                    default:
                        // 多个情况下返回数组
                        let reDatas = [];

                        // 是否有错误
                        let errors = [];

                        // 遍历加载
                        each(urlObjs, async (urlData, i) => {
                            let stat = 1;
                            // 获取数据
                            let sdata = await loadAgent(urlData).catch(() => {
                                errors.push(i);
                                stat = 0;
                            });

                            // 设置数据
                            reDatas[i] = sdata;

                            // 触发pending
                            pendFunc && pendFunc({
                                // 当前所处id
                                id: i,
                                // 总数
                                sum,
                                stat
                            });

                            // 递减数目
                            len--;

                            // 当达到数目，返回数据
                            if (!len) {
                                if (0 in errors) {
                                    rej({
                                        // 总共错误的id
                                        errors,
                                        // 返回总结果
                                        result: reDatas
                                    });
                                } else {
                                    res(reDatas);
                                }
                            }
                        });
                }
            });
        });

        // 传送数据的方法
        p.post = d => {
            // 将数据设置到urlObject上
            each(urlObjs, e => {
                e.data = d;
            });
            return p;
        };

        // pending记录
        p.pend = func => {
            pendFunc = func;
            return p;
        }

        // 放回promise
        return p;
    }

    // init
    // 暴露给外部用的主体对象
    let drill = {
        // 外部用require
        require: (...args) => require(args.map(e => fixPath(analyzeUrl(e)))),
        // 加载器
        loaders,
        // 处理器
        processor,
        // 错误处理信息
        errInfo,
        // 配置方法
        config(options) {
            // 根目录
            baseResources.baseUrl = options.baseUrl || baseResources.baseUrl;

            //配置paths
            let oPaths = options.paths;
            for (let i in oPaths) {
                if (/\/$/.test(i)) {
                    //属于目录类型
                    dirpaths[i] = {
                        // 正则
                        r: new RegExp('^' + i),
                        // 值
                        v: oPaths[i]
                    };
                } else {
                    //属于资源类型
                    paths[i] = oPaths[i];
                }
            }
        },
        cacheInfo: {
            // keyName
            k: "d_ver",
            // // value
            // v: ""
        },
        remove(url) {
            //获取路径
            let {
                path
            } = fixPath(analyzeUrl(url));

            if (bag[path]) {
                delete bag[path];

                //告示删除成功
                return !0;
            }
        }
    };

    // 模块初始化类型
    each(['define', 'task'], fType => {
        let func = drill[fType] = (d, moduleId) => {
            baseResources.tempM = {
                type: fType,
                d,
                moduleId
            };
        }

        // 暴露global
        glo[fType] || (glo[fType] = func);
    });

    // 初始化版本号
    let cScript = document.currentScript;
    !cScript && (cScript = document.querySelector(['drill-cache']));

    if (cScript) {
        let cacheVersion = cScript.getAttribute('drill-cache');
        cacheVersion && (drill.cacheInfo.v = cacheVersion);
    }

    glo.require || (glo.require = drill.require);

    // 判断全局是否存在变量 drill
    let gloDrill = glo.drill;
    gloDrill && gloDrill(drill);

    // 定义全局drill
    defineProperty(glo, 'drill', {
        get: () => drill,
        set(func) {
            if (isFunction(func)) {
                func(drill);
            } else {
                console.error('drill type error =>', func);
            }
        }
    });
})(window);