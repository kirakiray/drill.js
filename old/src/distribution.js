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
        let { url } = this;

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

    let { result } = dBag;

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
