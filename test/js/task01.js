task(async(require, data) => {
    var [n1, n2] = data;
    var data = await new Promise((res, rej) => {
        setTimeout(() => {
            res(n1 + n2);
        }, 500);
    });
    return data;
});