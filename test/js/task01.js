var g2 = expect(2, '两次task运行');

task(async(require, data) => {
    var [n1, n2] = data;
    g2.ok(1, "task01");
    var data = await new Promise((res, rej) => {
        setTimeout(() => {
            res(n1 + n2);
        }, 500);
    });
    return data;
});


once(1, 'load task01 ok');