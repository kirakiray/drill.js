((drill) => {
    // 存在indexDB的情况，添加离线缓存功能
    const DBNAME = 'drill_installer_database';
    const FILESTABLENAME = 'files';

    // 承接agent
    drill.ext('agent', async (args, next) => {
        let urlObj = args[0];

        // 读取source
        let sourceTemplink = await loadSource(urlObj);
        if (sourceTemplink) {
            // 修正link
            urlObj.link = sourceTemplink;
        }

        let reObj = next(...args);

        return reObj;
    });


    // 主体Database对象
    let mainDB;
    // 未处理的队列
    let initDBResolve;
    let isInitDB = new Promise((res, rej) => {
        initDBResolve = res;
    });

    // 文件目录存档
    let fileLinkMap = new Map();

    // 加载离线或者数据库文件数据
    const loadSource = async (urlObj) => {
        // 等待数据库初始化完成
        await isInitDB;

        // 要返回的数据
        let reData;

        // 获取文件读取状态
        let tarPromise = fileLinkMap.get(urlObj.path);

        if (!tarPromise) {
            // 设置Promise
            fileLinkMap.set(urlObj.path, tarPromise = (async () => {
                // 先从数据库获取数据
                let file = await loadData(urlObj.path);

                if (!file) {
                    // 没有的话就在线下载
                    // 请求链接内容
                    let p = await fetch(urlObj.link);

                    // 生成file前的两个重要数据
                    let type = p.headers.get('Content-Type').replace(/;.+/, "");
                    let fileName = urlObj.path.replace(/.+\//, "");

                    // 生成file格式
                    let blob = await p.blob();

                    // 生成file
                    file = new File([blob], fileName, {
                        type
                    })

                    // 存储到数据库中
                    saveData(urlObj.path, file);
                }

                // 生成url
                let tempUrl = URL.createObjectURL(file);

                return tempUrl;
            })());
        }

        // 获取数据
        reData = await tarPromise;

        return reData;
    }


    // 获取数据方法
    const loadData = path => new Promise((res, rej) => {
        // 新建事务
        var t = mainDB.transaction([FILESTABLENAME], "readonly");
        let store = t.objectStore(FILESTABLENAME);
        let req = store.get(path);
        req.onsuccess = () => {
            res(req.result && req.result.data);
            console.log(`load ${path} succeed ,  hasdata => ${!!req.result}`);
        }
        req.onerror = (e) => {
            rej();
            console.error(`error load ${path}`, e);
        }
    });

    // 保存数据
    const saveData = (path, b64) => new Promise((res, rej) => {
        // 新建事务
        var t = mainDB.transaction([FILESTABLENAME], "readwrite");
        let store = t.objectStore(FILESTABLENAME);
        let req = store.put({
            path,
            data: b64
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


    let isInstall = true;

    // 初始化是否 install
    let cScript = document.currentScript;
    if (cScript) {
        let isInstall_str = cScript.getAttribute('drill-install');
        if (isInstall_str == 'false' || isInstall_str == '0') {
            isInstall = false;
        }
    }

    const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

    // 初始化数据库
    if (indexedDB && isInstall) {
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
    }

})(window.drill);