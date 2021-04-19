

// function
// 获取随机id
const getRandomId = () => Math.random().toString(32).substr(2);
var objectToString = Object.prototype.toString;
var getType = value => objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
const isFunction = d => getType(d).search('function') > -1;
var isEmptyObj = obj => !(0 in Object.keys(obj));

//改良异步方法
const nextTick = (() => {
    let isDebug = document.currentScript.getAttribute("debug") !== null;
    if (isDebug) {
        let nMap = new Map();
        return (fun, key) => {
            if (!key) {
                key = getRandomId();
            }

            let timer = nMap.get(key);
            clearTimeout(timer);
            nMap.set(key, setTimeout(() => {
                fun();
                nMap.delete(key);
            }));
        };
    }

    // 定位对象寄存器
    let nextTickMap = new Map();

    let pnext = (func) => Promise.resolve().then(() => func())

    if (typeof process === "object" && process.nextTick) {
        pnext = process.nextTick;
    }

    let inTick = false;
    return (fun, key) => {
        if (!key) {
            key = getRandomId();
        }

        nextTickMap.set(key, { key, fun });

        if (inTick) {
            return;
        }

        inTick = true;

        pnext(() => {
            if (nextTickMap.size) {
                nextTickMap.forEach(({ key, fun }) => {
                    try {
                        fun();
                    } catch (e) {
                        console.error(e);
                    }
                    nextTickMap.delete(key);
                });
            }

            nextTickMap.clear();
            inTick = false;
        });
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