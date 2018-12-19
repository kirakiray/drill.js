// 用于xhear库载入html并获取temp的html代码用插件
drill.ext("fixUrlObj", (args, next, base) => {
    // 将dcode的相关数据修正
    let reData = next(...args);

    if (reData.fileType == "dcode") {
        let link = reData.link.replace(/\.dcode(\??.*)/, '.html$1');
        link && (reData.link = link);
    }

    return reData;
});

drill.ext(base => {
    let {
        loaders
    } = base;

    // 设置类型
    loaders.set('dcode', async (packData) => {
        let p;
        try {
            p = await fetch(packData.link);
        } catch (e) {
            packData.stat = 2;
            return;
        }
        let text = await p.text();

        // 正则匹配body的内容
        let bodyCode = text.match(/<body>([\d\D]*)<\/body>/);
        bodyCode && (bodyCode = bodyCode[1]);

        // 获取相应的dcode的数据
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = bodyCode;
        let domcodes = tempDiv.querySelectorAll('[domcode]');

        // 放入对象中
        let dataObj = {};
        domcodes && Array.from(domcodes).forEach(e => {
            let key = e.getAttribute('domcode');
            e.removeAttribute('domcode');
            if (key) {
                dataObj[key] = e.outerHTML;
            }
        });

        // 重置getPack
        packData.getPack = async () => {
            return dataObj;
        }

        // 设置完成
        packData.stat = 3;
    });
});