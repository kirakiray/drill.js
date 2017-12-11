task(async(require, data) => {
    let { d1, d2 } = data;
    let val = await require('./t1').post({
        d1,
        d2
    });
    return val;
});