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
