/*!
 * drill.js v4.0.0
 * https://github.com/kirakiray/drill.js
 * 
 * (c) 2018-2021 YAO
 * Released under the MIT License.
 */
((glo) => {
    "use strict";
    // function
    // 获取随机id
    const getRandomId = () => Math.random().toString(32).substr(2);
    var objectToString = Object.prototype.toString;
    var getType = value => objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
    const isFunction = d => getType(d).search('function') > -1;
    var isEmptyObj = obj => !(0 in Object.keys(obj));

    const {
        defineProperties
    } = Object;

    //改良异步方法
    const nextTick = (() => {
        const pnext = (func) => Promise.resolve().then(() => func());

        if (typeof process === "object" && process.nextTick) {
            pnext = process.nextTick;
        }

        return pnext;
    })();
    // 针对js类型的进程处理操作
    const processor = new Map();

    // 添加进程类型的方法
    const addProcess = (name, callback) => {
        processor.set(name, callback);

        defineProperties(glo, {
            [name]: {
                value: (respone) => {
                    let nowSrc = document.currentScript.src;

                    // 查看原来是否有record
                    let record = bag.get(nowSrc);

                    if (!record) {
                        record = new BagRecord(nowSrc);
                        bag.set(nowSrc, record);
                    }

                    // 设置加载中的状态
                    record.status = 1;

                    record.ptype = name;

                    callback({
                        respone,
                        record,
                        relativeLoad(...args) {
                            let repms = new Drill(...args);

                            // 设置相对目录
                            repms.__relative__ = nowSrc;

                            return repms;
                        }
                    });
                }
            }
        });
    }

    // 最初始的模块类型 define
    addProcess("define", async ({
        respone,
        record,
        relativeLoad
    }) => {
        // 完整的获取函数
        let getPack;

        if (isFunction(respone)) {
            const exports = {};

            // 先运行返回结果
            let result = await respone({
                load: relativeLoad,
                FILE: record.src,
                exports
            });

            // 没有放回结果并且exports上有数据
            if (result === undefined && !isEmptyObj(exports)) {
                result = exports;
            }

            getPack = (pkg) => {
                return result;
            }
        } else {
            // 直接赋值result
            getPack = (pkg) => {
                return respone;
            }
        }

        // 返回getPack函数
        record.done(getPack);
    });

    // 进程模块
    addProcess("task", async ({
        respone,
        record,
        relativeLoad
    }) => {
        if (!isFunction(respone)) {
            throw 'task must be a function';
        }

        record.done(async (pkg) => {
            return await respone({
                data: pkg.data,
                load: relativeLoad,
                FILE: record.src,
            });
        });
    });
    const loaders = new Map();

    // 添加加载器的方法
    const addLoader = (type, callback) => {
        loaders.set(type, src => {
            const record = bag.get(src)

            record.type = type;

            return callback({
                src,
                record
            });
        });
    }

    addLoader("js", ({
        src,
        record
    }) => {
        return new Promise((resolve, reject) => {
            // 主体script
            let script = document.createElement('script');

            //填充相应数据
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;

            // 挂载script元素
            record.sourceElement = script;

            // 添加事件
            script.addEventListener('load', async () => {
                // 添加脚本完成时间
                record.loadedTime = Date.now();

                // 判断资源是否有被设置加载中或完成的状态
                if (record.status == 0) {
                    record.ptype = "script";

                    // 未进入 1 或 2 状态，代表是普通js文件，直接执行done
                    record.done((pkg) => {});
                }

                resolve();
            });
            script.addEventListener('error', (event) => {
                // 加载错误
                reject({
                    desc: "load script error",
                    event
                });
            });

            // 添加进主体
            document.head.appendChild(script);
        });
    });

    addLoader("mjs", async ({
        src,
        record
    }) => {
        let d = await import(src);

        record.done(() => d);
    });

    addLoader("wasm", async ({
        src,
        record
    }) => {
        let data = await fetch(src).then(e => e.arrayBuffer());

        // 转换wasm模块
        let module = await WebAssembly.compile(data);
        const instance = new WebAssembly.Instance(module);

        record.done(() => instance.exports)
    });

    addLoader("json", async ({
        src,
        record
    }) => {
        let data = await fetch(src);

        // 转换json格式
        data = await data.json();

        record.done(() => data);
    });

    addLoader("css", async ({
        src,
        record
    }) => {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = src;

        // 挂载元素
        record.sourceElement = link;

        let isAppend = false;

        record.done(async (pkg) => {
            if (pkg.params.includes("-unpull")) {
                // 带unpull直接返回
                return link;
            }

            // 默认情况下会添加到body，并且不返回值
            if (!isAppend) {
                document.head.appendChild(link);
                isAppend = true;
            }

            // 未加载完成的话要等待
            if (!link.sheet) {
                await new Promise((resolve) => {
                    link.addEventListener("load", e => {
                        resolve();
                    });
                })
            }
        });
    });

    // 通过utf8返回数据
    ["html"].forEach(name => {
        addLoader(name, async ({
            src,
            record
        }) => {
            let data = await fetch(src).then(e => e.text());

            record.done(() => data);
        });
    });

    // 获取并通过respon返回数据
    const loadByFetch = async ({
        src,
        record
    }) => {
        let response = await fetch(src);

        if (!response.ok) {
            throw {
                desc: "fetch " + response.statusText,
                response
            };
        }

        // 重置getPack
        record.done(() => response);
    }

    // 所以文件的存储仓库
    const bag = new Map();

    // 背包记录器
    class BagRecord {
        constructor(src) {
            this.src = src;
            // 0 加载中
            // 1 加载资源成功（但依赖未完成）
            // 2 加载完成
            // -1 加载失败
            this.status = 0;
            this.bid = "b_" + getRandomId();

            // getPack函数的存放处
            this.data = new Promise((res, rej) => {
                this.__resolve = res;
                this.__reject = rej;
            });

            this.startTime = Date.now();
        }

        // 完成设置
        done(data) {
            this.status = 2;
            this.__resolve(data);

            delete this.__resolve;
            delete this.__reject;

            this.doneTime = Date.now();
        }
    }

    // 代理资源请求
    async function agent(pkg) {
        let record = bag.get(pkg.src);

        if (record) {
            const getPack = await record.data;

            return await getPack(pkg);
        }

        record = new BagRecord(pkg.src);

        bag.set(pkg.src, record);

        // 根据后缀名获取loader
        let loader = loaders.get(pkg.ftype);

        if (loader) {
            // 加载资源
            await loader(record.src);
        } else {
            // 不存在这种加载器
            console.warn({
                desc: "did not find this loader",
                type: pkg.ftype
            });

            // loadByUtf8({
            await loadByFetch({
                src: record.src,
                record
            });
        }

        // 返回数据
        const getPack = await record.data;

        return await getPack(pkg);
    }
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
            let {
                url
            } = this;

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
            this.params.some(e => {
                if (/^:(.+)/.test(e)) {
                    type = e.replace(/^:(.+)/, "$1")
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
        dBag.args.forEach(e => dBag.result.push(undefined))

        // 请求成功数统计
        let count = 0;
        // 是否出错过
        let iserror = false;

        let {
            result
        } = dBag;

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
                        data
                    });
                }

                if (dBag.args.length === 1) {
                    dBag[DRILL_RESOLVE](data);
                } else if (count === dBag.args.length && !iserror) {
                    dBag[DRILL_RESOLVE](result);
                }

                done = null
            }

            // 如果带有-link参数，直接返回链接
            if (pkg.params.includes("-link")) {
                done(pkg.src);
            } else if (pkg.params.includes("-pkg")) {
                done(pkg);
            } else {
                // 代理转发
                agent(pkg).then(done).catch(err => {
                    iserror = true;

                    if (err) {
                        console.error({
                            expr: str,
                            src: pkg.src,
                            ...err
                        });
                    }

                    result[index] = err;

                    dBag[DRILL_REJECT]({
                        expr: str,
                        src: pkg.src,
                        error: err
                    });

                    done = null
                });
            }
        });
    }
    const DRILL_RESOLVE = Symbol("resolve");
    const DRILL_REJECT = Symbol("reject");
    const POST_DATA = Symbol("postData");
    const DRILL_PENDFUNC = Symbol("pendFunc");

    class Drill extends Promise {
        constructor(...args) {
            if (isFunction(args[0])) {
                super(...args);
                return this;
            }
            let res, rej;

            super((resolve, reject) => {
                res = resolve;
                rej = reject;
            });

            this.id = "d_" + getRandomId();

            defineProperties(this, {
                [DRILL_RESOLVE]: {
                    value: res
                },
                [DRILL_REJECT]: {
                    value: rej
                },
                // 请求参数
                args: {
                    value: args
                },
                // 返回的结果
                result: {
                    value: []
                },
                // 相对路径
                __relative__: {
                    writable: true,
                    value: ""
                }
                // 响应数量
                // responded: {
                //     value: 0
                // }
            });

            nextTick(() => buildUp(this));
        }

        // 加载中
        pend(func) {
            if (this[DRILL_PENDFUNC]) {
                throw {
                    desc: "pend has been used",
                    target: this
                };
            }
            defineProperties(this, {
                [DRILL_PENDFUNC]: {
                    value: func
                }
            });

            return this;
        }

        // 发送数据
        post(data) {
            if (this[POST_DATA]) {
                throw {
                    desc: "post has been used",
                    target: this
                };
            }
            defineProperties(this, {
                [POST_DATA]: {
                    value: data
                }
            });

            return this;
        }
    }

    const load = glo.load = (...args) => new Drill(...args);

    const config = (opts) => {
        let {
            paths
        } = opts;
        if (paths) {
            // 快捷路径
            Object.keys(paths).forEach(k => {
                let val = paths[k];

                // 不是@开头/结尾的定义为不合法
                if (!/^@.+\/$/.test(k)) {
                    throw {
                        desc: "incorrect definition of paths",
                        key: k
                    };
                }

                if (!/.+\/$/.test(k)) {
                    throw {
                        desc: "incorrect definition of paths",
                        key: k,
                        path: val
                    };
                }

                // pathsMap.set(k, val);
                pathsMap.set(new RegExp(`^` + k), val);
            });
        }
    }

    const drill = {
        load,
        config,
        // 是否已加载该资源
        async has(src) {
            let path = await load(`${src} -link`);

            return !!bag.get(path);
        },
        // 删除该资源缓存
        async remove(src) {
            let path = await load(`${src} -link`);
            let record = bag.get(path);

            // 删除挂载元素
            let sele = record.sourceElement;
            if (sele) {
                sele.parentNode.removeChild(sele);
            }

            // 删除缓存数据
            bag.delete(path);
        },
        // 二次开发扩展方法
        ext(callback) {
            callback({
                bag,
                addLoader,
                addProcess
            });
        },
        // 版本信息
        version: "4.0.0",
        v: 4000000
    };

    // 全局函数
    defineProperties(glo, {
        drill: {
            value: drill
        }
    });

})(typeof globalThis != "undefined" ? globalThis : window);