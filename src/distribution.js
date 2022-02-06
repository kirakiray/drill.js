// 存储地址
const pathsMap = new Map();

class DPackage {
    constructor(str, bag) {
        let [url, ...params] = str.split(" ");
        this.url = url;
        this.params = params;
        this.bag = bag;
    }

    // 脚本地址
    get src() {
        let { url } = this;

        // 快捷地址
        if (/^@.+/.test(url)) {
            for (let [keyReg, path] of pathsMap) {
                if (keyReg.test(url)) {
                    url = url.replace(keyReg, path);
                    break;
                }
            }
        }

        // 如果有 -p 参数的，修正链接地址
        if (this.params.includes("-p")) {
            let packName = url.replace(/.+\/(.+)/, "$1");
            url += `/${packName}.js`;
        }

        let obj = new URL(url, this.relative);
        return obj.href;
    }

    // 文件类型，loader使用的类型，一般去路径后缀
    get ftype() {
        const urlObj = new URL(this.src);

        // 判断参数是否有 :xxx ，修正类型
        let type = urlObj.pathname.replace(/.+\.(.+)/, "$1");
        this.params.some((e) => {
            if (/^:(.+)/.test(e)) {
                type = e.replace(/^:(.+)/, "$1");
                return true;
            }
        });
        return type;
        // return this.url.replace(/.+\.(.+)/, "$1");
    }

    // 寄存的数据
    get data() {
        return this.bag[POST_DATA];
    }
    // 获取相对路径
    get relative() {
        return this.bag.__relative__ || location.href;
    }
}

// 分发
function buildUp(dBag) {
    dBag.args.forEach((e) => dBag.result.push(undefined));

    // 请求成功数统计
    let count = 0;
    // 是否出错过
    let iserror = false;

    let { result } = dBag;

    const pendFunc = dBag[DRILL_PENDFUNC];

    // 打包成可分发的对象
    dBag.args.forEach((str, index) => {
        let pkg = new DPackage(str, dBag);

        // 执行完成函数
        let done = (data) => {
            result[index] = data;
            count++;

            if (pendFunc) {
                pendFunc({
                    index,
                    pkg,
                    data,
                });
            }

            if (dBag.args.length === 1) {
                dBag[DRILL_RESOLVE](data);
            } else if (count === dBag.args.length && !iserror) {
                dBag[DRILL_RESOLVE](result);
            }

            done = null;
        };

        // 如果带有-link参数，直接返回链接
        if (pkg.params.includes("-link")) {
            done(pkg.src);
        } else if (pkg.params.includes("-pkg")) {
            done(pkg);
        } else {
            // 代理转发
            agent(pkg)
                .then(done)
                .catch((err) => {
                    iserror = true;

                    if (err) {
                        console.error({
                            expr: str,
                            src: pkg.src,
                            ...err,
                        });
                    }

                    result[index] = err;

                    dBag[DRILL_REJECT]({
                        expr: str,
                        src: pkg.src,
                        error: err,
                    });

                    done = null;
                });
        }
    });
}
