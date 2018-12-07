define((load, exports, module, {
    FILE
}) => {
     once(1, 'load define02 ok');

     once(FILE == "js2/define/define02.js", "FILE(define02) is ok");

    return {
        val: "I am define02"
    };
});