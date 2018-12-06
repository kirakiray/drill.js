((glo) => {
    // common
    // 进度寄存器
    const processor = new Map();
    // 加载寄存器
    const loaders = new Map();
    // 地址寄存器
    const bag = new Map();

    // 映射资源
    const paths = new Map();

    // 映射目录
    const dirpaths = {};

    // 基础数据对象
    let base = {
        // 根目录
        baseUrl: "",
        // 临时挂起的模块对象
        tempM: {}
    };

    // function


    // main
    const drill = {
        load(url) {

        },
        remove(url) {
            PushSubscription
        },
        config(options) {

        },
        define() {

        },
        task() {

        },
        cacheInfo: {
            k: "",
            v: ""
        }
    };

    // init 
    glo.drill = drill;
})(window);