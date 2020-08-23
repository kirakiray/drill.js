// 直接返回缓存地址的类型
const returnUrlSets = new Set(["png", "jpg", "jpeg", "bmp", "gif", "webp"]);

const getLoader = (fileType) => {
    // 立即请求包处理
    let loader = loaders.get(fileType);

    if (!loader) {
        // console.log("no such this loader => " + fileType);
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

/**
 * 加载包
 */
class PackData {
    constructor(props) {
        Object.assign(this, props);

        // 包的getter函数
        // 包加载完成时候，有特殊功能的，请替换掉async getPack函数
        // async getPack(urlObj) { }

        // 加载状态
        // 1加载中
        // 2加载错误，重新装载中
        // 3加载完成
        // 4彻底加载错误，别瞎折腾了
        this.stat = 1;

        // 等待通行的令牌
        this.passPromise = new Promise((res, rej) => {
            this._passResolve = res;
            this._passReject = rej;
        });

        // 错误路径地址
        this.errPaths = [];
    }

    // 获取当前path的目录
    get dir() {
        return getDir(this.path);
    }

    // 获取备份path
    get nextLink() {
        // 获取备份path的同时，相当于进入等待重载的状态
        this.stat = 2;

        let backupId = (this._backupId != undefined) ? ++this._backupId : (this._backupId = 0);


        let { backups } = errInfo;

        // 获取旧的base
        let oldBase = backups[backupId - 1] || base.baseUrl;

        // 获取下一个backup地址
        let nextBase = backups[backupId];

        if (!nextBase) {
            return;
        }

        let oldBaseStr = getFullPath(oldBase);
        let nextBaseStr = getFullPath(nextBase);

        this.errPaths.push(this.link);

        let link = this.link.replace(oldBaseStr, nextBaseStr);

        this.link = link;

        return link;
    }

    // 设置成功
    resolve(getPack) {
        this.getPack = getPack;
        this.stat = 3;
        this._passResolve();
    }

    // 通告pack错误
    reject() {
        this.stat = 4;
        this._passReject({
            desc: `load source error`,
            link: this.errPaths,
            packData: this
        });
    }
}

let agent = async (urlObj) => {
    // getLink直接返回
    if (urlObj.param && (urlObj.param.includes("-getLink")) && !offline) {
        return Promise.resolve(urlObj.link);
    }

    // 根据url获取资源状态
    let packData = bag.get(urlObj.path);

    if (!packData) {
        packData = new PackData({
            path: urlObj.path,
            link: urlObj.link,
            // 记录装载状态
            fileType: urlObj.fileType,
        });

        // 设置包数据
        bag.set(urlObj.path, packData);

        // 存储错误资源地址
        while (true) {
            try {
                // 文件link中转
                packData.link = await cacheSource({ packData });

                // 返回获取函数
                let getPack = (await getLoader(urlObj.fileType)(packData)) || (async () => { });
                packData.resolve(getPack);
                break;
            } catch (e) {
                packData.stat = 2;
                if (isHttpFront(urlObj.str)) {
                    // http引用的就别折腾
                    packData.reject();
                    break;
                }

                // 获取下一个链接
                let nextBackupLink = packData.nextLink;

                if (!nextBackupLink) {
                    packData.reject();
                    break;
                }

                // 等待重试
                await new Promise(res => setTimeout(res, errInfo.time));
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