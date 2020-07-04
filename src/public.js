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
