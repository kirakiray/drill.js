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

const isHttpFront = str => /^http/.test(str);

let agent = async (urlObj) => {
    // 根据url获取资源状态
    let packData = bag.get(urlObj.path);

    if (!packData) {
        packData = {
            // 加载状态
            // 1加载中
            // 2加载错误，重新装载中
            // 3加载完成
            // 4彻底加载错误，别瞎折腾了
            stat: 1,
            // 路径相关信息
            dir: urlObj.dir,
            path: urlObj.path,
            link: urlObj.link,
            // 记录装载状态
            fileType: urlObj.fileType,
            // 包的getter函数
            // 包加载完成时候，有特殊功能的，请替换掉async getPack函数
            // async getPack(urlObj) { }
        };

        // 设置包数据
        bag.set(urlObj.path, packData);

        while (true) {
            try {
                // 立即请求包处理
                packData.getPack = (await getLoader(urlObj.fileType)(packData)) || (async () => { });

                break;
            } catch (e) {
                if (isHttpFront(urlObj.str)) {
                    // http引用的就别折腾
                    break;
                }
                // 查看后备仓
                let { backups } = errInfo;
                if (backups.length) {
                    // 查看当前用了几个后备仓
                    let backupId = (packData.backupId != undefined) ? packData.backupId : (packData.backupId = -1);

                    // 重新加载包
                    if (backupId < backups.length) {
                        // 获取旧的地址
                        let oldBaseUrl = backups[backupId] || base.baseUrl;
                        let frontUrl = location.href.replace(/(.+\/).+/, "$1")

                        if (!isHttpFront(oldBaseUrl)) {
                            // 补充地址
                            oldBaseUrl = frontUrl + oldBaseUrl;
                        }

                        // 下一个地址
                        backupId = ++packData.backupId;

                        // 补充下一个地址
                        let nextBaseUrl = backups[backupId];

                        if (!nextBaseUrl) {
                            // 没有下一个就跳出
                            break;
                        }

                        if (!isHttpFront(nextBaseUrl)) {
                            nextBaseUrl = frontUrl + nextBaseUrl;
                        }

                        // 替换packData
                        packData.link = packData.link.replace(new RegExp("^" + oldBaseUrl), nextBaseUrl);

                        await new Promise(res => setTimeout(res, errInfo.time));
                    } else {
                        break;
                    }
                }
            }
        }
    }

    // 获取数据并返回
    return await packData.getPack(urlObj);
}

// 代理加载
// 根据不同加载状态进行组装
// let agent_backup = (urlObj) => {
//     // 根据url获取资源状态
//     let packData = bag.get(urlObj.path);

//     if (!packData) {
//         // 加载状态
//         // 1加载中
//         // 2加载错误，重新装载中
//         // 3加载完成
//         // 4彻底加载错误，别瞎折腾了
//         let stat = 1;

//         packData = {
//             get stat() {
//                 return stat;
//             },
//             set stat(d) {
//                 // 记录旧状态
//                 let oldStat = stat;

//                 // set
//                 stat = d;

//                 // 改动stat的时候触发changes内的函数
//                 this.changes.forEach(callback => callback({
//                     change: "stat",
//                     oldStat,
//                     stat
//                 }));
//             },
//             dir: urlObj.dir,
//             path: urlObj.path,
//             link: urlObj.link,
//             dir: urlObj.dir,
//             // 改动事件记录器
//             changes: new Set(),
//             // 记录装载状态
//             fileType: urlObj.fileType,
//             // 包的getter函数
//             // 包加载完成时候，有特殊功能的，请替换掉async getPack函数
//             async getPack(urlObj) { }
//         };

//         // 设置包数据
//         bag.set(urlObj.path, packData);

//         // 立即请求包处理
//         getLoader(urlObj.fileType)(packData);
//     }

//     return new Promise((res, rej) => {
//         // 根据状态进行处理
//         switch (packData.stat) {
//             case 2:
//             // 加载错误的重新装载，也加入队列
//             case 1:
//                 // 添加状态改动callback，确认加载完成的状态后，进行callback
//                 let statChangeCallback;
//                 packData.changes.add(statChangeCallback = (d) => {
//                     // 获取改动状态
//                     let {
//                         stat
//                     } = d;

//                     switch (stat) {
//                         case 3:
//                             // 加载完成，运行getPack函数
//                             packData.getPack(urlObj).then(res);

//                             // 清除自身callback
//                             packData.changes.delete(statChangeCallback);
//                             packData = null;
//                             break;
//                         case 2:
//                             // 重新装载
//                             // 获取计数器
//                             let loadCount = (packData.loadCount != undefined) ? packData.loadCount : (packData.loadCount = 0);

//                             // 存在次数
//                             if (loadCount < errInfo.loadNum) {
//                                 // 递增
//                                 packData.loadCount++;

//                                 // 重新装载
//                                 setTimeout(() => getLoader(packData.fileType)(packData), errInfo.time);
//                             } else {
//                                 // 查看有没有后备仓
//                                 let {
//                                     backups
//                                 } = errInfo;

//                                 // 确认后备仓
//                                 if (backups.size) {
//                                     // 查看当前用了几个后备仓
//                                     let backupId = (packData.backupId != undefined) ? packData.backupId : (packData.backupId = -1);
//                                     if (backupId < backups.size) {
//                                         // 转换数组
//                                         let barr = Array.from(backups);
//                                         let oldBaseUrl = barr[backupId] || packData.dir;

//                                         // 递增backupId
//                                         backupId = ++packData.backupId;
//                                         let newBaseUrl = barr[backupId];

//                                         // 修正数据重新载入
//                                         packData.loadCount = 1;
//                                         packData.link = packData.link.replace(new RegExp("^" + oldBaseUrl), newBaseUrl);

//                                         // 重新装载
//                                         setTimeout(() => getLoader(packData.fileType)(packData), errInfo.time);
//                                         return;
//                                     }
//                                 }
//                                 // 载入不进去啊大佬，别费劲了
//                                 packData.stat = 4;
//                             }

//                             break;
//                         case 4:
//                             rej("source error");
//                             break;
//                     }
//                 });
//                 break;
//             case 3:
//                 nextTick(() => {
//                     // 已经加载完成的，直接获取
//                     packData.getPack(urlObj).then(res);
//                 });
//                 break;
//             case 4:
//                 // 彻底加载错误的资源，就别瞎折腾了
//                 rej("source error");
//                 break;
//         }
//     });
// }