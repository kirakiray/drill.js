// 相对路径测试
define(async(require) => {
    let d2 = await require('./d2');
    let d = await require('../d').post('d1 post data');
    return { d2, d };
});