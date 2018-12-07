task(async(load, data) => {
    let d = await new Promise(res => {
        setTimeout(() => {
            res({
                val: "haha I am d.js",
                postData: data
            });
        }, 1000);
    });

    return d;
});