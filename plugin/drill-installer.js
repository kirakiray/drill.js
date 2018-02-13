drill.extend((baseResources, R) => {
    // 旧的方法
    let old_loadscript = R.loadScript;

    // 基础替换 ------
    R.loadScript = (pathOption, res, rej) => {
        let script;

        // 判断b64数据库里是否有
        let b64data = b64Databases[pathOption.path];
        if (b64data) {
            // 清理b64对象数据
            b64Databases[pathOption.path] = !1;

            // 执行旧方法得到script
            script = old_loadscript({
                path: ""
            }, res, rej);

            // 替换base64地址
            script.src = b64data;
        } else if (isInstall && loadStall) {
            script = loadStall(pathOption, res, rej);
        } else {
            // 继承旧的方法
            script = old_loadscript.call(R, pathOption, res, rej);
        }
        return script;
    }

    // base64数据库（内存数据库） ------
    let b64Databases = {};
    drill.setModule = (pathname, b64) => {
        b64Databases[pathname] = b64;
    }

    // indexDB离线数据库(硬盘数据库) ------
    var installer = drill.installer = {};

    // 是否离线安装
    // 默认安装选择是false
    let isInstall = false;
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    // 初始化是否 install
    let cScript = document.currentScript;
    if (!cScript) {
        cScript = document.querySelector(['drill-isinstall']);
    }
    if (cScript) {
        let isInstall_str = cScript.getAttribute('drill-isinstall');
        if (isInstall_str && isInstall_str != 'false' && isInstall_str != '0') {
            isInstall = true;
        }
    }

    drill.isInstall = isInstall;

    // 从安装器读取数据
    var loadStall;

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
            saveQueue.forEach(async e => {
                // 保存数据
                let data = await saveData(e.url, e.b64);

                // 返回数据
                e.res(data);
            });

            // 清空
            loadQueue = saveQueue = null;
        }

        // 队列数组
        let saveQueue = [];
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
                    console.error(`save data(${url}) error`, e);
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

        loadStall = async(pathOption, res, rej) => {
            let { path } = pathOption;

            // 先读取目录，看存不存在
            let b64_path = await loadData(path);

            // 没有数据请求线上数据
            if (!b64_path) {
                let f = await fetch(path);

                // 转换成file
                let file = await f.blob();

                // 转存base64
                let b64 = await new Promise(res => {
                    let fs = new FileReader();
                    fs.onload = () => {
                        res(fs.result);
                    }
                    fs.readAsDataURL(file);
                });

                // 存储数据
                await saveData(path, b64);

                // 设置数据
                b64_path = b64;
            }

            // 继承旧的方法 
            let script = old_loadscript({
                path: ""
            }, res, rej);

            // 设置b64地址
            script.src = b64_path;

            return script;
        };
    }
});