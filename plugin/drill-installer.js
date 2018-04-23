// 离线存储插件
(() => {
    // base64数据库（内存数据库） ------
    let b64Databases = {};
    drill.setModule = (pathname, b64) => {
        b64Databases[pathname] = b64;
    }

    // 是否离线安装
    // 默认安装选择是false
    let isInstall = true;

    // 间接扩展
    drill.ext('loadSource', async ([...args], next) => {
        let [urlObj] = args;

        // 判断是否在base64库里面
        if (b64Databases[urlObj.path]) {
            urlObj.link = b64Databases[urlObj.path];
        } else if (isInstall && loadStall) {
            await loadStall(urlObj);
        }

        // 继承返回
        return next(...args);
    });

    // 从安装器读取数据
    var loadStall;

    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    // 初始化是否 install
    let cScript = document.currentScript;
    if (!cScript) {
        cScript = document.querySelector(['drill-install']);
    }
    if (cScript) {
        let isInstall_str = cScript.getAttribute('drill-install');
        if (isInstall_str == 'false' || isInstall_str == '0') {
            isInstall = false;
        }
    }

    Object.defineProperty(drill, 'installer', {
        set(val) {
            isInstall = val;
        },
        get() {
            return isInstall;
        }
    });

    // 初始化IndexDB逻辑
    if (indexedDB && isInstall) {
        // 存在indexDB的情况，添加离线缓存功能
        const DBNAME = 'drill_installer_database';
        const FILESTABLENAME = 'files';

        // indexDB寄存对象
        let db;

        // 初始打开
        let openRequest = indexedDB.open(DBNAME, drill.cacheInfo.v || 1);
        openRequest.onupgradeneeded = (e) => {
            // 升级中的db，不暴露出去的
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

        // 初始成功
        openRequest.onsuccess = (e) => {
            // 挂载主体db
            db = e.target.result;

            // 处理队列
            loadQueue.forEach(async e => {
                // 读取数据
                let data = await loadData(e.url);

                // 返回数据
                e.res(data);
            });

            // 清空
            loadQueue = null;
        }

        // 队列数组
        let loadQueue = [];

        // 获取数据方法
        let loadData = url => new Promise((res, rej) => {
            if (db) {
                // 新建事务
                var t = db.transaction([FILESTABLENAME], "readonly");
                let store = t.objectStore(FILESTABLENAME);
                let req = store.get(url);
                req.onsuccess = () => {
                    res(req.result && req.result.d);
                    console.log(`load ${url} succeed ,  hasdata => ${!!req.result}`);
                }
                req.onerror = (e) => {
                    rej();
                    console.error(`error load ${url}`, e);
                }
            } else {
                // 判断是否存在db，不存在先加入队列
                loadQueue.push({
                    url,
                    res
                });
            }
        });

        // 保存数据
        let saveData = (url, b64) => new Promise((res, rej) => {
            if (db) {
                // 新建事务
                var t = db.transaction([FILESTABLENAME], "readwrite");
                let store = t.objectStore(FILESTABLENAME);
                let req = store.put({
                    path: url,
                    d: b64
                });
                req.onsuccess = () => {
                    res({
                        stat: 1
                    });
                    console.log(`save ${url} succeed`);
                };
                req.onerror = (e) => {
                    res({
                        stat: 0
                    })
                    console.error(`save (${url}) error`, e);
                };
            } else {
                // 判断是否存在db，不存在先加入队列
                loadQueue.push({
                    url,
                    b64,
                    res
                });
            }
        });

        // 内存寄存对象
        let memoryData = {};

        loadStall = async (urlObj) => {
            let { path } = urlObj;

            // 文件资源地址
            let filelink;

            // 查看是否在内存数据内
            if (memoryData[path]) {
                filelink = memoryData[path];
            } else {
                // 先读取目录，看存不存在
                let fileObject = await loadData(path);

                // 没有数据请求线上数据
                if (!fileObject) {
                    // let f = await fetch(path);

                    // // 转换成file
                    // fileObject = await f.blob();

                    // 直接获取file
                    fileObject = await new Promise(res => {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', path, true);
                        xhr.responseType = 'blob';
                        xhr.onload = function (e) {
                            if (this.status == 200) {
                                var blob = this.response;
                                res(blob);
                            }
                        };
                        xhr.send();
                    });

                    // 存储数据
                    await saveData(path, fileObject);
                }

                switch (isInstall) {
                    case "base64":
                        filelink = await new Promise(res => {
                            let fs = new FileReader();
                            fs.onload = () => {
                                res(fs.result);
                            }
                            fs.readAsDataURL(fileObject);
                        });
                        break;
                    default:
                        // 生成内存地址
                        filelink = URL.createObjectURL(fileObject);
                }

                // 写入映射
                memoryData[path] = filelink;
            }

            // 替换link
            urlObj.link = filelink;
        };
    }
})();