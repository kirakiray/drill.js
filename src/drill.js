((glo) => {
    "use strict";
    //common
    const Docum = document;
    const windowHead = Docum.head;

    const
    //模块处理中 
        PENDING = "pending",
        //模块加载成功
        RESOLVED = "resolved",
        //模块加载失败
        REJECTED = "rejected",
        //js加载完成，但是模块定义未完成
        LOADED = "loaded";

    //映射资源
    var paths = {};

    //映射目录
    var dirpaths = {};

    //载入模块用的map对象
    var dataMap = {};

    //基础数据对象
    var baseResources = {
        paths: paths,
        dirpaths: dirpaths,
        //js模块相对路径
        baseUrl: "",
        dataMap: dataMap,
        //临时挂起的模块对象
        tempM: {}
    };

    //function
    //转换成array类型
    var arrayslice = Array.prototype.slice;
    var makeArray = arrobj => arrayslice.call(arrobj);

    //获取类型
    var objectToString = Object.prototype.toString;
    var getType = value => objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');

    //array类型的遍历
    var arrayEach = (arr, func) => {
        !(arr instanceof Array) && (arr = makeArray(arr));
        arr.some((e, i) => func(e, i) === false);
        return arr;
    };

    //获取目录名
    var getDir = url => {
        let urlArr = url.match(/(.+\/).+/);
        return urlArr && urlArr[1];
    };

    //修正字符串路径
    var removeParentPath = (url) => {
        let urlArr = url.split(/\//g);
        let newArr = [];
        arrayEach(urlArr, (e) => {
            if (e == '..' && newArr.length && (newArr.slice(-1)[0] != "..")) {
                newArr.pop();
                return;
            }
            newArr.push(e);
        });
        return newArr.join('/');
    };

    //改良异步方法
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

    //是否空对象
    var isEmptyObj = (obj) => {
        for (let i in obj) {
            return 0;
        }
        return 1;
    }

    //是否undefined
    var isUndefined = val => val === undefined;

    //返回Promise实例
    var promise = func => new Promise(func);

    // 拆分参数和真实地址
    var split_drill_param = url => {
        var sarr = url.split(" ").filter((e) => {
            if (e) return e;
        });
        return [sarr[0], sarr.slice(1)];
    };

    //main
    //主业务逻辑
    var R = {
        //加载script的方法
        loadScript: pData => {
            let url = pData.path;
            let script = Docum.createElement('script');

            //判断版本号
            let { k, v } = drill.cacheInfo;
            if (url && k && v) {
                if (url.search(/\?/) > -1) {
                    url += "&" + k + "=" + v;
                } else {
                    url += "?" + k + "=" + v;
                }
            }

            //填充相应数据
            script.type = 'text/javascript';
            script.async = true;
            url && (script.src = url);

            //ie10对 async支持差的修正方案
            nextTick(() => {
                windowHead.appendChild(script);
            });

            return script;
        },
        //载入单个资源的代理方法
        agent: (pData, pubData) => promise((res, rej) => {
            let { param, path } = pData;
            let tar = dataMap[path];
            if (tar) {
                switch (tar.state) {
                    case LOADED:
                    case PENDING:
                        tar.c.push({
                            res,
                            pubData
                        });
                        break;
                    case RESOLVED:
                        nextTick(() => {
                            if (tar.get) {
                                tar.get((data) => {
                                    res(data);
                                }, pubData);
                            } else {
                                res();
                            }
                        });
                        break;
                    case REJECTED:
                        nextTick(() => {
                            rej();
                        });
                        break;
                }
            } else {
                dataMap[path] = tar = {
                    //模块类型
                    // type: "file",
                    state: PENDING,
                    c: [{
                        res,
                        rej,
                        pubData
                    }]
                };

                let script = R.loadScript(pData);

                script.onload = () => {
                    tar.state = LOADED;
                    R.setTemp(pData);
                    baseResources.tempM = {};
                };
                script.onerror = () => {
                    while (0 in tar.c) {
                        tar.c.shift().rej('load script error => ' + path);
                    }
                    baseResources.tempM = {};
                    tar.state = REJECTED;
                    delete tar.c;
                }
            }
        }),
        //根据数组内的路径进行封装返回Promise对象
        toProm: (args, pubData) => {
            let pendFun;

            let pms = promise((res, rej) => {
                let arr = [];
                let len = args.length;

                //确认返回数据的方法
                let monitFun = () => {
                    len--;
                    if (!len) {
                        pendFun = null;
                        if (arr.length == 1) {
                            res(arr[0]);
                        } else {
                            res(arr);
                        };
                    }
                };

                arrayEach(args, (pData, i) => {
                    //获取实际路径
                    pData = R.getPath(pData, pubData);

                    //获取promise模块
                    let p = R.agent(pData, pubData);

                    p.then((data) => {
                        arr[i] = data;
                        pendFun && pendFun(data, i);
                        monitFun();
                    }).catch((err) => {
                        rej(err);
                    });
                });
            });

            //加入pend事件
            pms.pend = (func) => {
                pendFun = func;
                return pms;
            };

            return pms;
        },
        // 设定默认文件类型
        // 默认支持的 普通js文件（file），define模块，task进程
        setTemp: pData => {
            let { path } = pData;

            //获取模块数据
            let { tempM } = baseResources;
            let data = tempM.d;
            let { ids } = tempM;

            //查看是否有设定ids
            (ids && getType(ids) == "string") && (ids = [ids]);

            let tar = dataMap[path];

            //默认模块为普通文件类型
            let type = tar.type = (tempM.type || "file");

            //判断是否有自定义id
            if (ids) {
                arrayEach(ids, (e) => {
                    dataMap[e] = tar;
                });
            }

            //运行成功
            let runFunc = d => {
                //响应队列resolve函数
                while (0 in tar.c) {
                    tar.c.shift().res(d);
                }

                //设置返回数据的方法
                tar.get = (callback) => {
                    callback(d);
                };

                //设置完成
                tar.state = RESOLVED;

                //清除无用数据
                delete tar.c;
            }

            //根据类型做不同的处理
            switch (type) {
                //普通文件类型
                case "file":
                    runFunc();
                    break;
                    //模块类型
                case "define":
                    //判断是否是函数
                    if (getType(data).search('function') > -1) {
                        let exports = {},
                            module = {
                                exports: exports
                            };

                        //判断返回值是否promise
                        let p = data(function(...args) {
                            return R.require(args, {
                                rel: path
                            });
                        }, exports, module, {
                            FILE: path
                        });

                        if (p instanceof Promise) {
                            p.then((d) => {
                                if (isUndefined(d) && getType(module.exports) == "object" && !isEmptyObj(module.exports)) {
                                    d = module.exports;
                                }
                                runFunc(d);
                            });
                        } else {
                            //数据类型
                            runFunc(p);
                        }
                    } else {
                        runFunc(data);
                    }
                    break;
                    //任务类型
                case "task":
                    runFunc = null;
                    //设定数据值
                    if (getType(data).search('function') > -1) {
                        let getFun = tar.get = (res, pubData) => {
                            let p = data(function(...args) {
                                return R.require(args, {
                                    rel: path
                                });
                            }, pubData.pdata, {
                                FILE: path
                            });
                            p.then((d) => {
                                res(d);
                            });
                        };

                        //响应队列resolve函数
                        while (0 in tar.c) {
                            let {
                                res,
                                pubData
                            } = tar.c.shift();
                            getFun(res, pubData);
                        }
                    } else {
                        throw 'task module type error';
                    }

                    //设置完成
                    tar.state = RESOLVED;

                    //清除无用数据
                    delete tar.c;
                    break;
            };
        },
        //转换路径
        getPath: (pData, pubData) => {
            let { param, path } = pData;

            let relatePath = pubData.rel;
            //判断是否已经注册了路径
            if (paths[path]) {
                path = paths[path];
            } else {
                let tarreg;
                //判断是否注册目录
                for (let i in dirpaths) {
                    tarreg = new RegExp('^' + i);
                    if (tarreg.test(path)) {
                        path = path.replace(tarreg, dirpaths[i]);
                        break
                    }
                }
            }

            //判断是否带协议头部
            //没有协议
            if (!/^.+?\/\//.test(path)) {
                //是否带参数
                if (!/\?.+$/.test(path) && !/.js$/.test(path)) {
                    //没有js的话加上js后缀
                    path += ".js";
                }

                //判断是否有相对路径字样
                let rePath = path.match(/^\.\/(.+)/);
                if (rePath) {
                    //获取相对目录
                    path = getDir(relatePath) + rePath[1];
                } else {
                    // 判断是否有 -r(root)参数
                    if (param.indexOf('-r') == -1) {
                        //加上根目录
                        path = baseResources.baseUrl + path;
                    }
                }

                //去除相对上级目录
                path = removeParentPath(path);
            }

            // 修正参数值
            pData.path = path;

            return pData;
        },
        //引用模块
        require: (args, pubData = {}) => {
            let new_args = [];
            // 拆分args的参数
            arrayEach(args, (e) => {
                let [path, param] = split_drill_param(e);
                new_args.push({
                    path,
                    param
                });
            });

            let p = R.toProm(new_args, pubData);

            //添加post方法
            p.post = (data) => {
                pubData.pdata = data;
                return p;
            }
            return p;
        },
        //定义模块
        define: (d, ids) => {
            baseResources.tempM = {
                type: "define",
                d: d,
                ids: ids
            };
        },
        //定义进程
        task: (d, ids) => {
            baseResources.tempM = {
                type: "task",
                d: d,
                ids: ids
            };
        }
    };

    //主体require
    var require = (...args) => {
        return R.require(args);
    };
    var oDefine = (d, ids) => {
        R.define(d, ids);
    };
    var oTask = (d, ids) => {
        R.task(d, ids);
    }

    var drill = {
        config: data => {
            //配置baseurl
            baseResources.baseUrl = data.baseUrl || baseResources.baseUrl;

            //配置paths
            for (let i in data.paths) {
                if (/\/$/.test(i)) {
                    //属于目录类型
                    dirpaths[i] = data.paths[i];
                } else {
                    //属于资源类型
                    paths[i] = data.paths[i];
                }
            }
        },
        remove: url => {
            //获取路径
            let { path } = R.getPath({ path: url }, {});

            //获取寄存对象
            let tarData = dataMap[path];

            if (tarData) {
                delete dataMap[path];
                //告示删除成功
                return true;
            }
        },
        //扩展函数
        extend: option => {
            option(baseResources, R);
        },
        require: require,
        define: oDefine,
        task: oTask,
        //缓存版本号
        cacheInfo: {
            k: "srcache"
                //, v: ""
        }
    };

    //init
    // 初始化版本号
    let cScript = Docum.currentScript;
    if (!cScript) {
        cScript = Docum.querySelector(['drill-cache']);
    }
    if (cScript) {
        let cacheVersion = cScript.getAttribute('drill-cache');
        cacheVersion && (drill.cacheInfo.v = cacheVersion);
    }

    // 外部使用的变量
    glo.require || (glo.require = require);
    glo.define || (glo.define = oDefine);
    glo.task || (glo.task = oTask);
    if (glo.drill) {
        if (getType(glo.drill)) {
            glo.drill(drill);
        } else {
            throw "async drill.js type error";
        }
    }
    glo.drill = drill;

    window.baseResources = baseResources;

})(window);