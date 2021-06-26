task(async ({ load, data }) => {
    let { d1, d2 } = data;
    let val = await load('./t1.js').post([d1, d2]);
    return val;
});