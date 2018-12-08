define((load, exports, module, {
    FILE
}) => {
     once(1, 'load define02 ok');

     debugger
     once(FILE == "js/define/define02.js", "FILE(define02) is ok");

    return {
        val: "I am define02"
    };
});