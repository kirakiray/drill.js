const load = lm(import.meta);

(async () => {
  const t1 = await load("../esm/test-module1.mjs");
  const t2 = await load("../other/bbb.txt");
  const t3 = await load("../other/ccc.json");
  const wUtil = await load("../other/wasm/test.wasm");

  console.log(t1);
  console.log(t2);
  console.log(t3);
  console.log(wUtil, wUtil.add(1, 4));
})();
