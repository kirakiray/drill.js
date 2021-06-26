if (typeof drill !== "undefined") {
    const publicWorkerFunc = () => {
        let data;
        let getted_msg = false;
        // 事件临时存储队列
        const e_arr = [];

        onmessage = (e) => {
            data = e.data;

            if (e_arr.length) {
                e_arr.forEach(func => {
                    func({
                        data
                    });
                });
                e_arr.length = 0;
            }
        }

        globalThis.work = (callback) => {
            if (getted_msg) {
                callback({
                    data
                });
            } else {
                e_arr.push(callback);
            }
        };
    }

    // worker文件公用模块
    // let public_worker = new File([], "drill_public_worker.js")

    async function work({
        respone,
        record,
        relativeLoad
    }) {
        // 将函数转为函数文件
        let w_text = `(${publicWorkerFunc.toString()})();
work(${respone.toString()})`;

        let file_name = record.src.replace(/.+\/(.+\..+)/, "$1") || "worker.js";

        let file = new File([w_text], file_name);

        // 生成内存文件
        let file_src = URL.createObjectURL(file);

        record.done(async (pkg) => {
            let worker = new Worker(file_src);

            worker.postMessage(pkg.data);

            worker.onmessage = (e) => {
                debugger
            }
            // return await respone({
            //     data: pkg.data,
            //     load: relativeLoad,
            //     FILE: record.src,
            // });
        });

        // 稍后删除script标签
        // setTimeout(() => {
        //     record.sourceElement.parentNode.removeChild(record.sourceElement);
        // }, 10);
    }

    drill.ext(({ bag, addLoader, addProcess }) => {
        // 进程模块
        addProcess("work", work);
    });
} else {
    // 其他环境内
    debugger
}
