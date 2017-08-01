define(async(require) => {
    var d1 = await require('./define01');

    return {
        d1: d1,
        val: "I am define03"
    };
});