const DBNAME = "drill-cache-db";
const FILESTABLENAME = 'files';

// 主体Database对象
let mainDB;
// 未处理的队列
let isInitDB = new Promise((initDBResolve, reject) => {
    const indexedDB = glo.indexedDB || glo.webkitIndexedDB || glo.mozIndexedDB || glo.msIndexedDB;

    // 初始化数据库
    if (indexedDB) {
        // 初始打开
        let openRequest = indexedDB.open(DBNAME, drill.cacheInfo.v || 1);
        openRequest.onupgradeneeded = (e) => {
            // 升级中（初始化中）的db触发事件，db不暴露出去的
            let db = e.target.result;

            // 判断是否存在表
            // 判断是否存在
            if (!db.objectStoreNames.contains(FILESTABLENAME)) {
                // 建立存储对象空间
                db.createObjectStore(FILESTABLENAME, {
                    keyPath: "path"
                });
            } else {
                // 存在的话先删除
                db.deleteObjectStore(FILESTABLENAME);

                // 重新创建
                db.createObjectStore(FILESTABLENAME, {
                    keyPath: "path"
                });
            }
        };

        // 初始成功触发的callback
        openRequest.onsuccess = (e) => {
            // 挂载主体db
            mainDB = e.target.result;

            // 确认初始化
            initDBResolve();
        }
    } else {
        reject("rubish browser no indexDB");
    }
});

// 加载离线或者数据库文件数据
// 每个路径文件，要确保只加载一次
// blobCall 用于扩展程序二次更改使用
let cacheSource = async ({ packData }) => {
    // 离线处理
    if (!drill.cacheInfo.offline) {
        return packData.link;
    }

    // 等待数据库初始化完成
    await isInitDB;

    // 先从数据库获取数据
    let file = await getFile(packData.path);

    if (!file) {
        // 没有的话就在线下载
        // 请求链接内容
        let p = await fetch(packData.link);

        if (p.status != 200) {
            // 清空状态
            // 加载失败，抛出错误
            throw {
                type: "cacheSource",
                desc: "statusError",
                status: p.status
            };
        }

        // 生成file前的两个重要数据
        let type = p.headers.get('Content-Type').replace(/;.+/, "");
        let fileName = packData.path.replace(/.+\//, "");

        // 生成file格式
        let blob = await p.blob();

        // 生成file
        file = new File([blob], fileName, {
            type
        })

        // 存储到数据库中
        await saveFile(packData.path, file);
    }

    // 挂载file文件
    packData.offlineFile = file;

    // 生成url
    let tempUrl = packData.offlineUrl = URL.createObjectURL(file);

    return tempUrl;
}


// 获取数据方法
const getFile = path => new Promise((res, rej) => {
    // 新建事务
    var t = mainDB.transaction([FILESTABLENAME], "readonly");
    let store = t.objectStore(FILESTABLENAME);
    let req = store.get(path);
    req.onsuccess = () => {
        res(req.result && req.result.data);
    }
    req.onerror = (e) => {
        rej();
        console.error(`error load ${path}`, e);
    }
});

// 保存数据
const saveFile = (path, file) => new Promise((res, rej) => {
    // 新建事务
    var t = mainDB.transaction([FILESTABLENAME], "readwrite");
    let store = t.objectStore(FILESTABLENAME);
    let req = store.put({
        path,
        data: file
    });
    req.onsuccess = () => {
        res({
            stat: 1
        });
        console.log(`save ${path} succeed`);
    };
    req.onerror = (e) => {
        res({
            stat: 0
        })
        console.error(`save (${path}) error`, e);
    };
});