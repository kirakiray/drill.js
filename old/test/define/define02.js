define(({ load, FILE }) => {
    once(1, 'load define02 ok');

    once(FILE.search('define/define02.js') > -1, "FILE(define02) is ok");

    return {
        val: "I am define02"
    };
});