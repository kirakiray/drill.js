// 直接返回缓存地址的类型
const returnUrlSets = new Set(["png", "jpg", "jpeg", "bmp", "gif", "webp"]);

const getLoader = (fileType) => {
    // 立即请求包处理
    let loader = loaders.get(fileType);

    if (!loader) {
        console.log("no such this loader => " + fileType);
        loader = getByUtf8;
    }

    // 判断是否图片
    if (returnUrlSets.has(fileType)) {
        loader = getByUrl;
    }

    return loader;
}

// 获取并通过utf8返回数据
const getByUtf8 = async packData => {
    let data = await fetch(packData.link);

    // 转换text格式
    data = await data.text();

    // 重置getPack
    return async () => {
        return data;
    }
}

// 返回内存的地址
const getByUrl = async packData => {
    // 判断是否已经在缓存内
    if (packData.offlineUrl) {
        return async () => {
            return packData.offlineUrl;
        }
    }

    let data = await fetch(packData.link);

    let fileBlob = await data.blob();

    let url = URL.createObjectURL(fileBlob);

    return async () => {
        return url;
    }
}

const isHttpFront = str => /^http/.test(str);

let agent = async (urlObj) => {
    // getLink直接返回
    if (urlObj.param && (urlObj.param.includes("-getLink")) && !offline) {
        return Promise.resolve(urlObj.link);
    }

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

        // 等待通行的令牌
        packData.passPromise = new Promise((res, rej) => {
            packData._passResolve = res;
            packData._passReject = rej;
        });

        // 设置包数据
        bag.set(urlObj.path, packData);

        // 存储错误资源地址
        let errPaths = [packData.link];

        const errCall = (e) => {
            packData.stat = 4;
            packData._passReject({
                desc: `load source error`,
                link: errPaths,
                packData
            });
        }

        while (true) {
            try {
                // 文件link中转
                packData.link = await cacheSource({ packData });

                // 立即请求包处理
                packData.getPack = (await getLoader(urlObj.fileType)(packData)) || (async () => { });

                packData.stat = 3;

                packData._passResolve();
                break;
            } catch (e) {
                // console.error("load error =>", e);

                packData.stat = 2;
                if (isHttpFront(urlObj.str)) {
                    // http引用的就别折腾
                    break;
                }
                // 查看后备仓
                let { backups } = errInfo;
                if (!backups.length) {
                    errCall();
                    break;
                } else {
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
                            errCall();
                            break;
                        }

                        if (!isHttpFront(nextBaseUrl)) {
                            nextBaseUrl = frontUrl + nextBaseUrl;
                        }

                        // 替换packData
                        packData.link = packData.link.replace(new RegExp("^" + oldBaseUrl), nextBaseUrl);
                        errPaths.push(packData.link);

                        await new Promise(res => setTimeout(res, errInfo.time));
                    } else {
                        packData.stat = 4;
                        errCall();
                        break;
                    }
                }
            }
        }
    }

    // 等待通行证
    await packData.passPromise;

    // 在offline情况下，返回link
    if (urlObj.param && (urlObj.param.includes("-getLink")) && offline) {
        return Promise.resolve(packData.link);
    }

    return await packData.getPack(urlObj);
}