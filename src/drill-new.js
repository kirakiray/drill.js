((glo) => {
    // common
    // 进度寄存器
    const processors = new Map();
    // 加载寄存器
    const loaders = new Map();
    // 地址寄存器
    const bag = new Map();

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
    var getRandomId = () => Math.random().toString(32).substr(2);

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

    // main
    // processors添加普通文件加载方式
    processors.set("file", (packData) => {
        // 直接修改完成状态
        packData.stat = 3;
    });
    processors.set("define", (packData) => {
        debugger
    });
    processors.set("task", (packData) => {
        debugger
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

            // 清空tempM
            base.tempM = {};

            // 判断是否有自定义id
            if (moduleId) {
                bag.get(moduleId) && bag.set(moduleId, packData);
            }

            // 进行processors断定
            // 默认是file类型
            let process = processors.get(type || "file");

            if (process) {
                process(packData);
            } else {
                throw "no such this procress => " + type;
            }
        });
        script.addEventListener('error', () => {
            // 进行processors断定
            debugger
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
                    if (oldStat == stat) {
                        return;
                    }

                    // set
                    stat = d;

                    // 改动stat的时候触发changes内的函数
                    this.changes.forEach(callback => callback({
                        oldStat,
                        stat
                    }));
                },
                path: urlObj.path,
                // 改动事件记录器
                changes: [],
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
                    packData.changes.push(statChangeCallback = (d) => {
                        // 获取改动状态
                        let {
                            stat
                        } = d;

                        debugger

                        if (stat == 1) {
                            // 加载完成，运行getPack函数
                            packData.getPack(urlObj).then(res);

                            // 清除自身callback
                            let cid = packData.changes.indexOf(statChangeCallback);
                            packData.changes.splice(cid, 1);
                            packData = null;
                        }
                    });
                    break;
                case 2:
                    debugger
                    break;
                case 3:
                    // 已经加载完成的，直接获取
                    packData.getPack(urlObj).then(res);
                    break;
            }
        });

    }

    // 主体加载函数
    let load = (urlObjs) => {
        let pendFunc;
        let p = new Promise((res, rej) => {
            // 要返回的数据
            let reValue;

            urlObjs.forEach(async e => {
                // 中转加载资源
                let d = await agent(e);


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
            debugger
        }

        // 判断是否有基于根目录参数
        if (param.indexOf('-r') > -1 || /^.+:\/\//.test(ori)) {
            path = ori;
        } else if (/^\./.test(ori)) {
            if (urlObj.rel) {
                // 添加相对路径
                path = urlObj.rel + ori;
            } else {
                path = ori.replace(/^\.\//, "");
            }
        } else {
            // 添加相对目录，得出资源地址
            path = base.baseUrl + ori;
        }

        // 添加后缀
        path += "." + fileType;

        Object.assign(urlObj, {
            search,
            ori,
            fileType,
            path,
            param
        });

        return urlObj;
    }

    const drill = {
        load(...args) {
            // 生成组id
            let groupId = getRandomId();

            // 转化成urlObj
            let urlObjs = args.map(url => fixUrlObj({
                loadId: getRandomId(),
                str: url,
                groupId
            }));

            return load(urlObjs);
        },
        remove(url) {
            PushSubscription
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
                    paths[i] = oPaths[i];
                }
            });
        },
        define() {

        },
        task() {

        },
        cacheInfo: {
            k: "",
            v: ""
        }
    };

    // init 
    glo.drill = drill;
    glo.load || (glo.load = drill.load);
    glo.define || (glo.define = drill.define);
    glo.task || (glo.task = drill.task);

})(window);