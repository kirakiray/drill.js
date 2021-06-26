define(async ({ load, exports }) => {
    var [d2, d1] = await load('./define02.js', './define01.js');

    exports.d1 = d1;
    exports.d2 = d2;

    var d3 = await load('./define03.js');
    exports.d3 = d3;

    exports.val = "I am define04";

    once(1, 'load define04 ok');
});