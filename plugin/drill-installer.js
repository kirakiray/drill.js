drill.extend((baseResources, R) => {
    //改良异步方法
    const windowHead = document.head;
    var nextTick = (() => {
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

    // 旧的方法
    let old_loadscript = R.loadScript;

    // 获取历史版本
    let local_drill_version = localStorage['drill_version'];

    // 默认安装选择是false
    drill.isInstall = false;

    // 初始化是否 install
    let cScript = document.currentScript;
    if (!cScript) {
        cScript = document.querySelector(['drill-isinstall']);
    }
    if (cScript) {
        let isInstall_str = cScript.getAttribute('drill-isinstall');
        (isInstall_str != "false") && (drill.isInstall = true);
    }

    // 修正indexDB
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || null;

    if (indexedDB) {
        // 初始状态暂时寄存 load 的 promise 的 resolve
        var startLoadResolve = [];
        // 初始状态暂时寄存 save 的 promise 的 resolve
        var startSaveResolve = [];
        // 保存器和读取器
        drill.installer = {
            // 设置一个等待函数
            load: url => new Promise((res) => {
                // 确定有indexDB的
                if (indexedDB) {
                    startLoadResolve.push({ url, res });
                }
            }),
            save: (url, b64) => new Promise((res) => {
                // 确定有indexDB的
                if (indexedDB) {
                    startSaveResolve.push({ url, res, b64 });
                }
            })
        };

        // 中心数据库
        var db;
        var osName = "fileMap";
        let req = indexedDB.open("drill_installer", drill.cacheInfo.v || 1);
        req.onupgradeneeded = (e) => {
            db = e.target.result;

            // 判断是否存在
            if (!db.objectStoreNames.contains(osName)) {
                // 建立存储对象空间
                db.createObjectStore(osName, {
                    keyPath: "path"
                });
            } else {
                // 存在的话先删除
                db.deleteObjectStore(osName);

                // 重新创建
                db.createObjectStore(osName, {
                    keyPath: "path"
                });
            }

            // 更新版本
            localStorage['drill_version'] = drill.cacheInfo.v;
        };
        req.onerror = (e) => {
            console.error('version error , old version : ', localStorage['drill_version'], 'now version : ' + drill.cacheInfo.v);
        };
        req.onsuccess = (e) => {
            db = e.target.result;

            // 覆盖save方法
            drill.installer.save = (url, b64) => new Promise((res, rej) => {
                // 写入数据库
                let t = db.transaction([osName], "readwrite");
                let store = t.objectStore(osName);
                let req = store.put({
                    path: url,
                    d: b64
                });
                req.onsuccess = () => {
                    res();
                    console.log('save succeed => ', url);
                }
                req.onerror = () => {
                    rej();
                    console.error('save error =>', url);
                }
            });
            // 覆盖load方法
            drill.installer.load = (url) => new Promise((res, rej) => {
                // 读取数据库
                let t = db.transaction([osName], "readonly");
                let store = t.objectStore(osName);
                let req = store.get(url);
                req.onsuccess = (e) => {
                    url
                    res(req.result && req.result.d);
                    console.log('get succeed => ', url);
                }
                req.onerror = () => {
                    rej();
                    console.error('get error =>', url);
                }
            });

            // 判断是否有暂存的res
            if (startLoadResolve.length) {
                startLoadResolve.forEach(async(e) => {
                    let { url, res } = e;
                    let d = await drill.installer.load(url);
                    res(d);
                });
            }
            if (startSaveResolve.length) {
                startSaveResolve.forEach(async(e) => {
                    let { url, res, b64 } = e;
                    await drill.installer.save(url, b64);
                    res();
                });
            }
            startSaveResolve = startLoadResolve = null;
        }
    }

    // 本地设置模块方法
    drill.setModule = (path, b64) => {
        instantData[path] = b64;
    };

    // 是否要重新请求
    let need_updata = false;
    // 判断版本是否一致
    if (local_drill_version != drill.cacheInfo.v) {
        need_updata = true;
    }

    // 数据寄存对象
    var instantData = {};

    // 替换主体方法
    R.loadScript = url => {
        let script;

        if (instantData[url]) {
            script = old_loadscript.call(R, "");
            script.src = instantData[url];
            delete instantData[url];
        } else if (drill.isInstall && indexedDB) {
            script = old_loadscript.call(R, "");

            // 跑异步函数
            (async() => {
                // 判断是否存在
                if (!need_updata) {
                    let d = await drill.installer.load(url);
                    if (d) {
                        // 存在就直接设置并返回
                        script.src = d;
                        return;
                    }
                }

                // 获取服务端的文件
                let d = await fetch(url);
                d = await d.blob();
                let fs = new FileReader();
                fs.onload = (e) => {
                    script.src = fs.result;

                    // 存储数据
                    drill.installer && drill.installer.save && drill.installer.save(url, fs.result);
                }
                fs.readAsDataURL(d);
            })();
        } else {
            script = old_loadscript.call(R, url);
        }

        return script;
    };
});