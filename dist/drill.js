/*!
 * drill.js v4.0.0
 * https://github.com/kirakiray/drill.js
 * 
 * (c) 2018-2023 YAO
 * Released under the MIT License.
 */
((glo) => {
    "use strict";
    // functions
    const getRandomId = () => Math.random().toString(32).substr(2);
    const objectToString = Object.prototype.toString;
    const getType = (value) =>
        objectToString
        .call(value)
        .toLowerCase()
        .replace(/(\[object )|(])/g, "");
    const isFunction = (d) => getType(d).search("function") > -1;
    const isEmptyObj = (obj) => !(0 in Object.keys(obj));

    const {
        defineProperties
    } = Object;

    const nextTick = (() => {
        const pnext = (func) => Promise.resolve().then(() => func());

        if (typeof process === "object" && process.nextTick) {
            pnext = process.nextTick;
        }

        return pnext;
    })();

    // Process handling operations for js types
    const processor = new Map();

    // Functions for adding process types
    const addProcess = (name, callback) => {
        processor.set(name, callback);

        defineProperties(glo, {
            [name]: {
                value: (respone) => {
                    let nowSrc = document.currentScript.src;

                    // Check if there is a record
                    let record = getBag(nowSrc);

                    if (!record) {
                        record = new BagRecord(nowSrc);
                        setBag(nowSrc, record);
                    }

                    // Set the loading status
                    record.status = 1;

                    record.ptype = name;

                    callback({
                        respone,
                        record,
                        relativeLoad(...args) {
                            let repms = new Drill(...args);

                            // Set relative directory
                            repms.__relative__ = nowSrc;

                            return repms;
                        },
                    });
                },
            },
        });
    };

    // Initial module type: define
    addProcess("define", async ({
        respone,
        record,
        relativeLoad
    }) => {
        // Functions for returning module content
        let getPack;

        if (isFunction(respone)) {
            const exports = {};

            // Run first to return results
            let result = await respone({
                load: relativeLoad,
                FILE: record.src,
                exports,
            });

            if (result === undefined && !isEmptyObj(exports)) {
                result = exports;
            }

            getPack = (pkg) => {
                return result;
            };
        } else {
            // Assign the result directly
            getPack = (pkg) => {
                return respone;
            };
        }

        // Return the getPack function
        record.done(getPack);
    });

    // Initial module type: task
    addProcess("task", async ({
        respone,
        record,
        relativeLoad
    }) => {
        if (!isFunction(respone)) {
            throw "task must be a function";
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

    // function for adding loaders
    const addLoader = (type, callback) => {
        loaders.set(type, (src) => {
            const record = getBag(src);

            record.type = type;

            return callback({
                src,
                record,
            });
        });
    };

    addLoader("js", ({
        src,
        record
    }) => {
        return new Promise((resolve, reject) => {
            // main script element
            let script = document.createElement("script");

            script.type = "text/javascript";
            script.async = true;
            script.src = src;

            // Mounted script element
            record.sourceElement = script;

            script.addEventListener("load", async () => {
                // Script load completion time
                record.loadedTime = Date.now();

                // Determine if a resource has been set to loading or completed status
                if (record.status == 0) {
                    record.ptype = "script";

                    // No 1 or 2 state, it means it's a normal js file, just execute done
                    record.done((pkg) => {});
                }

                resolve();
            });
            script.addEventListener("error", (event) => {
                // load error
                reject({
                    desc: "load script error",
                    event,
                });
            });

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
        let data = await fetch(src).then((e) => e.arrayBuffer());

        let module = await WebAssembly.compile(data);
        const instance = new WebAssembly.Instance(module);

        record.done(() => instance.exports);
    });

    addLoader("json", async ({
        src,
        record
    }) => {
        let data = await fetch(src);

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

        record.sourceElement = link;

        let isAppend = false;

        record.done(async (pkg) => {
            if (pkg.params.includes("-unpull")) {
                // If there is an unpull parameter, the link element is returned and not added to the head
                return link;
            }

            // By default it is added to the head and does not return a value
            if (!isAppend) {
                document.head.appendChild(link);
                isAppend = true;
            }

            // Wait if not finished loading
            if (!link.sheet) {
                await new Promise((resolve) => {
                    link.addEventListener("load", (e) => {
                        resolve();
                    });
                });
            }
        });
    });

    // The following types return utf8 strings
    ["html"].forEach((name) => {
        addLoader(name, async ({
            src,
            record
        }) => {
            let data = await fetch(src).then((e) => e.text());

            record.done(() => data);
        });
    });

    const loadByFetch = async ({
        src,
        record
    }) => {
        let response = await fetch(src);

        if (!response.ok) {
            throw {
                desc: "fetch " + response.statusText,
                response,
            };
        }

        // Reset getPack
        record.done(() => response);
    };

    // So the information about the file exists on this object
    const bag = new Map();

    const setBag = (src, record) => {
        let o = new URL(src);
        bag.set(o.origin + o.pathname, record);
    };

    const getBag = (src) => {
        let o = new URL(src);
        return bag.get(o.origin + o.pathname);
    };

    class BagRecord {
        constructor(src) {
            this.src = src;
            // 0 Loading
            // 1 Loaded resources successfully (but dependencies not completed)
            // 2 Loading completed
            // -1 Load failure
            this.status = 0;
            this.bid = "b_" + getRandomId();

            // repository of the getPack function
            this.data = new Promise((res, rej) => {
                this.__resolve = res;
                this.__reject = rej;
            });

            this.startTime = Date.now();
        }

        done(data) {
            this.status = 2;
            this.__resolve(data);

            delete this.__resolve;
            delete this.__reject;

            this.doneTime = Date.now();
        }

        fail(err) {
            this.status = -1;
            this.__reject(data);

            delete this.__resolve;
            delete this.__reject;

            this.doneTime = Date.now();
        }
    }

    const notfindLoader = {};

    // Agent resource requests
    async function agent(pkg) {
        let record = getBag(pkg.src);

        if (record) {
            if (record.status == -1) {
                throw {
                    expr: pkg.url,
                    src: record.src,
                };
            }

            const getPack = await record.data;

            return await getPack(pkg);
        }

        record = new BagRecord(pkg.src);

        setBag(pkg.src, record);

        // Get loader by suffix name
        let loader = loaders.get(pkg.ftype);

        try {
            if (loader) {
                // Loading resource
                await loader(record.src);
            } else {
                if (!notfindLoader[pkg.ftype]) {
                    // No such loader exists
                    console.warn({
                        desc: "did not find this loader",
                        type: pkg.ftype,
                    });

                    notfindLoader[pkg.ftype] = 1;
                }

                // loadByUtf8({
                await loadByFetch({
                    src: record.src,
                    record,
                });
            }
        } catch (err) {
            record.fail(err);
        }

        const getPack = await record.data;

        return await getPack(pkg);
    }

    // Save shortcut path in this object
    const pathsMap = new Map();

    class DPackage {
        constructor(str, bag) {
            let [url, ...params] = str.split(" ");
            this.url = url;
            this.params = params;
            this.bag = bag;
        }

        get src() {
            let {
                url
            } = this;

            // Add the part in front of the shortcut path
            if (/^@.+/.test(url)) {
                for (let [keyReg, path] of pathsMap) {
                    if (keyReg.test(url)) {
                        url = url.replace(keyReg, path);
                        break;
                    }
                }
            }

            // If there is a -p parameter, fix the link path
            if (this.params.includes("-p")) {
                let packName = url.replace(/.+\/(.+)/, "$1");
                url += `/${packName}.js`;
            }

            let obj = new URL(url, this.relative);
            return obj.href;
        }

        // File type, the type used by the loader, usually takes the path suffix
        get ftype() {
            const urlObj = new URL(this.src);

            // Determine if the parameter has :xxx , correction type
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

        // Get the data passed during the module
        get data() {
            return this.bag[POST_DATA];
        }
        get relative() {
            return this.bag.__relative__ || location.href;
        }
    }

    // Main distribution function
    function buildUp(dBag) {
        dBag.args.forEach((e) => dBag.result.push(undefined));

        // Number of successful requests 
        let count = 0;
        let iserror = false;

        let {
            result
        } = dBag;

        const pendFunc = dBag[DRILL_PENDFUNC];

        // Packaged into distributable objects
        dBag.args.forEach((str, index) => {
            let pkg = new DPackage(str, dBag);

            // Execution completion function
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

            // If the -link parameter is present, the link is returned directly
            if (pkg.params.includes("-link")) {
                done(pkg.src);
            } else if (pkg.params.includes("-pkg")) {
                done(pkg);
            } else {
                // Proxy Forwarding
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
                    value: res,
                },
                [DRILL_REJECT]: {
                    value: rej,
                },
                // Parameters for load modules
                args: {
                    value: args,
                },
                // The final array of returned results
                result: {
                    value: [],
                },
                // Relative path to load module
                __relative__: {
                    writable: true,
                    value: "",
                },
            });

            nextTick(() => buildUp(this));
        }

        pend(func) {
            if (this[DRILL_PENDFUNC]) {
                throw {
                    desc: "pend has been used",
                    target: this,
                };
            }
            defineProperties(this, {
                [DRILL_PENDFUNC]: {
                    value: func,
                },
            });

            return this;
        }

        // Passing data to the module to be loaded
        post(data) {
            if (this[POST_DATA]) {
                throw {
                    desc: "post has been used",
                    target: this,
                };
            }
            defineProperties(this, {
                [POST_DATA]: {
                    value: data,
                },
            });

            return this;
        }
    }


    const load = (glo.load = (...args) => new Drill(...args));

    const config = (opts) => {
        let {
            paths
        } = opts;
        if (paths) {
            // Shortcut path
            Object.keys(paths).forEach((k) => {
                let val = paths[k];

                // Definitions that do not start/end with @ are not legal
                if (!/^@.+\/$/.test(k)) {
                    throw {
                        desc: "incorrect definition of paths",
                        key: k,
                    };
                }

                if (!/.+\/$/.test(k)) {
                    throw {
                        desc: "incorrect definition of paths",
                        key: k,
                        path: val,
                    };
                }

                // pathsMap.set(k, val);
                pathsMap.set(new RegExp(`^` + k), val);
            });
        }
    };

    const drill = {
        load,
        config,
        // Whether the resource has been loaded
        async has(src) {
            let path = await load(`${src} -link`);

            return !!getBag(path);
        },
        // Delete this resource cache
        async remove(src) {
            let path = await load(`${src} -link`);
            let record = getBag(path);

            // Delete Mounted Elements
            let sele = record.sourceElement;
            if (sele) {
                sele.parentNode.removeChild(sele);
            }

            // Delete cached data
            bag.delete(path);
        },
        // Secondary development extension method
        ext(callback) {
            callback({
                bag,
                addLoader,
                addProcess,
            });
        },
        bag,
        version: "4.0.0",
        v: 4000000,
    };

    // Global Functions
    defineProperties(glo, {
        drill: {
            value: drill,
        },
    });
})(typeof globalThis != "undefined" ? globalThis : window);