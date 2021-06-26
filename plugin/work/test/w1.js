// 必须先引用work插件
importScripts("../work.js");
work(async ({ data }) => {
    await new Promise(res => {
        setTimeout(() => {
            res();
        }, 200);
    });

    return data[0] + data[1];
});