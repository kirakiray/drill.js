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
            // 请求参数
            args: {
                value: args,
            },
            // 返回的结果
            result: {
                value: [],
            },
            // 相对路径
            __relative__: {
                writable: true,
                value: "",
            },
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

    // 发送数据
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
