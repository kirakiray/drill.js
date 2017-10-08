var g2 = expect(2, '两次task01运行');

task(async(require, data, { FILE }) => {
    let d1 = await require('./define/define01');
    ok(d1.val == "I am define01", "relative path");

    var [n1, n2] = data;
    g2.ok(1, "task01");

    ok(FILE == "js/task01.js", "FILE(task01) is ok");

    var data = await new Promise((res, rej) => {
        setTimeout(() => {
            res(n1 + n2);
        }, 500);
    });
    return data;
});


once(1, 'load task01 ok');