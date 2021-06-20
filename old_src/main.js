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
    let processDefineFunc = (d) => {
        base.tempM = {
            type: processName,
            d
        };
    }

    drill[processName] || (drill[processName] = processDefineFunc);
    glo[processName] || (glo[processName] = processDefineFunc);
}

// 设置缓存中转器的函数
const setCacheDress = (cacheType, dressRunner) => {
    cacheDress.set(cacheType, async ({ file, packData }) => {
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