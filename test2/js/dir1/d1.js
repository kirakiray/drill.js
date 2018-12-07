// 相对路径测试
define(async (load) => {
    let d2 = await load('./d2');
    let c = await load('c');
    let d = await load('../d').post('d1 post data');
    return {
        d2,
        d,
        c
    };
});