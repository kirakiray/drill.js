const load = lm(import.meta);

describe("load module", () => {
  test("load in ctx mode", async () => {
    const ctx = await load("../esm/test-module1.mjs -ctx");

    expect(ctx.result.val).toEqual("test module 1");
  });

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

  test("load css succeed", async () => {
    const cssContent = await load("../other/test.css");

    expect(cssContent.includes("#test-ele")).toBe(true);
  });

  test("load css by element", async () => {
    await new Promise((res) => setTimeout(res, 50));

    expect(getComputedStyle(document.querySelector("#test-ele")).color).toBe(
      "rgb(0, 0, 255)"
    );

    document.querySelector(`l-m[src="./other/test.css"]`).remove();

    await new Promise((res) => setTimeout(res, 1));

    expect(getComputedStyle(document.querySelector("#test-ele")).color).toBe(
      "rgb(0, 0, 0)"
    );
  });
});
