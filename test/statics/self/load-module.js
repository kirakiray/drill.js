const load = lm(import.meta);

describe("load module", () => {
  test("load es module succeed", async () => {
    const data = await load("../esm/test-module1.mjs");

    expect(data.val).toEqual("test module 1");
  });

  test("load txt succeed", async () => {
    const data = await load("../other/bbb.txt");

    expect(data).toEqual("I am txt file");
  });

  test("load json succeed", async () => {
    const data = await load("../other/ccc.json");

    expect(data).toEqual({
      name: "ccc json",
    });
  });

  test("load wasm succeed", async () => {
    const { add, square } = await load("../other/wasm/test.wasm");

    expect(add(3, 3)).toBe(6);

    expect(square(3, 3)).toBe(9);
  });
});
