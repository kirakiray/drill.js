const load = lm(import.meta);

(async () => {
  const t1 = await load("../esm/test-module1.mjs");
  const t2 = await load("../other/bbb.txt");

  console.log(t1);
  console.log(t2);
})();
