define(async(require, exports) => {
    var [d2, d1] = await require('./define02', './define01');

    exports.d1 = d1;
    exports.d2 = d2;

    var d3 = await require('./define03');
    exports.d3 = d3;

    exports.val = "I am define04";
});