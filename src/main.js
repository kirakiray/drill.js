// 设置加载器
let setProcessor = (processName, processRunner) => {
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
    if (param.includes('-r') || /^.+:\/\//.test(ori)) {
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

    // 对 -mjs 参数修正
    if (param.includes("-mjs")) {
        fileType = "mjs";
    }

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