// 设置 css 缓存中转，对css引用路径进行修正
setCacheDress("css", async ({ fileText, relativeLoad }) => {
    // 获取所有import字符串
    let importArrs = fileText.match(/@import ["'](.+?)["']/g);
    if (importArrs) {
        // 缓存外部样式
        await Promise.all(importArrs.map(async e => {
            let path = e.replace(/@import ["'](.+?)["']/, "$1");

            let link = await relativeLoad(`${path} -getLink`);

            // 修正相应路径
            fileText = fileText.replace(e, `@import "${link}"`);
        }));
    }

    // 缓存外部资源
    let urlArrs = fileText.match(/url\((.+?)\)/g);
    if (urlArrs) {
        await Promise.all(urlArrs.map(async e => {
            // 获取资源路径
            let path = e.replace(/url\((.+?)\)/, "$1").replace(/["']/g, "");

            // 确定不是协议http|https的才修正
            if (/(^http:)|(^https:)/.test(path)) {
                return Promise.resolve("");
            }

            let link = await relativeLoad(`${path} -getLink`);

            // 修正相应路径
            fileText = fileText.replace(e, `url("${link}")`);
        }));
    }

    return fileText;
});

// 对mjs引用路径进行修正
setCacheDress("mjs", async ({ fileText, relativeLoad }) => {
    // import分组获取
    let importsArr = fileText.match(/import .+ from ['"](.+?)['"];/g)

    if (importsArr) {
        await Promise.all(importsArr.map(async e => {
            let exArr = e.match(/(import .+ from) ['"](.+?)['"];/, "$1");

            if (exArr) {
                let path = exArr[2];

                // 获取对应的链接地址
                let link = await relativeLoad(`${path} -getLink`);

                fileText = fileText.replace(e, `${exArr[1]} "${link}"`);
            }
        }))
    }

    let asyncImports = fileText.match(/import\(.+?\)/g);
    if (asyncImports) {
        await Promise.all(asyncImports.map(async e => {
            let path = e.replace(/import\(["'](.+?)['"]\)/, "$1");
            let link = await relativeLoad(`${path} -getLink`);

            fileText = fileText.replace(e, `import("${link}")`);
        }));
    }

    return fileText;
});