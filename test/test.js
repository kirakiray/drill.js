
(async () => {
    const tester = expect(6, 'module test');

    let count = 0;
    // 并行加载资源
    let data1 = await load("file/file01.js", "define/d1.js", "define/define03.js", "define/define04.js")
        .pend(e => {
            count++;
        });

    tester.ok(count === 4, "pend count ok");
    tester.ok(data1[1] == "I am d1" && data1[3].d1.val === "I am define01" && data1[3].d1 === data1[2].d1, "define ok");

    // 确定不会重复加载js
    let before_script_len = document.scripts.length;
    await load("file/file01.js", "define/d1.js", "define/define03.js");
    tester.ok(before_script_len === document.scripts.length, `script length ok (${before_script_len})`);

    let b = await load("task/t1.js").post([120, 230]);
    let c = await load("task/t2.js").post({ d1: 120, d2: 230 });

    tester.ok(b === c && b === 350, "task ok");

    let d = await load("define/pack1 -p");

    tester.ok(d === "I am pack01", "load pack ok");

    let e = await load("esmodule/m2.js :mjs");

    tester.ok(e.val == "I am m2.js" && e.m1val == "I am m1", "es module ok");

})();

(async () => {
    const tester = expect(3, 'wasm and json test');

    let { add, square } = await load("wasm/test.wasm");

    tester.ok(add(3, 3) == 6, "wasm ok 1");
    tester.ok(square(3, 3) == 9, "wasm ok 2");

    let a = await load("other/ccc.json");

    tester.ok(a.name === "ccc json", "load json ok");
})();

(async () => {
    const tester = expect(2, 'css and other loader test');

    // 测试加载样式文件
    let tele = document.createElement("div");
    tele.classList.add("a");
    document.body.appendChild(tele);
    // 获取初始字体大小
    let before_size = parseInt(getComputedStyle(tele).fontSize);
    await load("other/test.css");
    // 加载完成后的字体大小
    let after_size = parseInt(getComputedStyle(tele).fontSize);

    tester.ok(before_size !== after_size && after_size == 20, "load css ok");

    // 不支持的类型返回fetch的response对象
    let a = await load("other/bbb.txt");

    tester.ok(await a.text() == "I am txt file", "load txt ok");
})();

(async () => {
    const tester = expect(4, 'config paths test');

    drill.config({
        paths: {
            "@long/": "long1/long2/long3/"
        }
    });

    let a = await load("@long/l1.js");

    tester.ok(a == "long file01", "map load ok");

    // 尝试获取link
    // 获取link操作 不会被入库缓存
    let b = await load("@long/l2.js -link");
    tester.ok(b.includes("long1/long2/long3/l2.js"), "get link ok");

    let hasL1Source = await drill.has("@long/l1.js");
    let hasL2Source = await drill.has("@long/l2.js");

    tester.ok(hasL1Source === true && hasL2Source === false, "has ok");

    // 去除后重载
    let before_scipt = document.querySelector("script[src*='l1']");
    await drill.remove("@long/l1.js");
    let after_script = document.querySelector("script[src*='l1']");
    let hasL1Source_after = await drill.has("@long/l1.js");
    tester.ok(!!before_scipt === true && !!after_script === false && hasL1Source_after === false, "remove ok");
})();