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

// 代理加载
// 根据不同加载状态进行组装
let agent = (urlObj) => {
    // 根据url获取资源状态
    let packData = bag.get(urlObj.path);

    if (!packData) {
        // 加载状态
        // 1加载中
        // 2加载错误，重新装载中
        // 3加载完成
        // 4彻底加载错误，别瞎折腾了
        let stat = 1;

        packData = {
            get stat() {
                return stat;
            },
            set stat(d) {
                // 记录旧状态
                let oldStat = stat;

                // set
                stat = d;

                // 改动stat的时候触发changes内的函数
                this.changes.forEach(callback => callback({
                    change: "stat",
                    oldStat,
                    stat
                }));
            },
            dir: urlObj.dir,
            path: urlObj.path,
            link: urlObj.link,
            dir: urlObj.dir,
            // 改动事件记录器
            changes: new Set(),
            // 记录装载状态
            fileType: urlObj.fileType,
            // 包的getter函数
            // 包加载完成时候，有特殊功能的，请替换掉async getPack函数
            async getPack(urlObj) { }
        };

        // 设置包数据
        bag.set(urlObj.path, packData);

        // 立即请求包处理
        getLoader(urlObj.fileType)(packData);
    }

    return new Promise((res, rej) => {
        // 根据状态进行处理
        switch (packData.stat) {
            case 2:
            // 加载错误的重新装载，也加入队列
            case 1:
                // 添加状态改动callback，确认加载完成的状态后，进行callback
                let statChangeCallback;
                packData.changes.add(statChangeCallback = (d) => {
                    // 获取改动状态
                    let {
                        stat
                    } = d;

                    switch (stat) {
                        case 3:
                            // 加载完成，运行getPack函数
                            packData.getPack(urlObj).then(res);

                            // 清除自身callback
                            packData.changes.delete(statChangeCallback);
                            packData = null;
                            break;
                        case 2:
                            // 重新装载
                            // 获取计数器
                            let loadCount = (packData.loadCount != undefined) ? packData.loadCount : (packData.loadCount = 0);

                            // 存在次数
                            if (loadCount < errInfo.loadNum) {
                                // 递增
                                packData.loadCount++;

                                // 重新装载
                                setTimeout(() => getLoader(packData.fileType)(packData), errInfo.time);
                            } else {
                                // 查看有没有后备仓
                                let {
                                    backups
                                } = errInfo;

                                // 确认后备仓
                                if (backups.size) {
                                    // 查看当前用了几个后备仓
                                    let backupId = (packData.backupId != undefined) ? packData.backupId : (packData.backupId = -1);
                                    if (backupId < backups.size) {
                                        // 转换数组
                                        let barr = Array.from(backups);
                                        let oldBaseUrl = barr[backupId] || packData.dir;

                                        // 递增backupId
                                        backupId = ++packData.backupId;
                                        let newBaseUrl = barr[backupId];

                                        // 修正数据重新载入
                                        packData.loadCount = 1;
                                        packData.link = packData.link.replace(new RegExp("^" + oldBaseUrl), newBaseUrl);

                                        // 重新装载
                                        setTimeout(() => getLoader(packData.fileType)(packData), errInfo.time);
                                        return;
                                    }
                                }
                                // 载入不进去啊大佬，别费劲了
                                packData.stat = 4;
                            }

                            break;
                        case 4:
                            rej("source error");
                            break;
                    }
                });
                break;
            case 3:
                nextTick(() => {
                    // 已经加载完成的，直接获取
                    packData.getPack(urlObj).then(res);
                });
                break;
            case 4:
                // 彻底加载错误的资源，就别瞎折腾了
                rej("source error");
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