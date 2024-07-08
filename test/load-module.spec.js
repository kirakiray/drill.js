const { test, expect } = require("@playwright/test");

test("load es module", async ({ page }) => {
  await page.goto(
    "http://localhost:3340/test/statics/load-module/es-module.html"
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  await expect(await page.innerText("body")).toBe("test module 1");
});

test("load ctx", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/load-module/ctx.html");

  await new Promise((resolve) => setTimeout(resolve, 500));

  await expect(await page.innerText("body")).toBe("test module 1");
});

test("load txt", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/load-module/txt.html");

  await new Promise((resolve) => setTimeout(resolve, 500));

  await expect(await page.innerText("body")).toBe("I am txt file");
});

test("load json", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/load-module/json.html");

  await new Promise((resolve) => setTimeout(resolve, 500));

  expect(await page.innerText("body")).toEqual(
    JSON.stringify({
      name: "ccc json",
    })
  );
});

test("load wasm", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/load-module/wasm.html");

  await new Promise((resolve) => setTimeout(resolve, 500));

  await expect(await page.innerText("body")).toBe("6-9");
});

test("load css", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/load-module/css.html");

  await new Promise((resolve) => setTimeout(resolve, 500));

  await expect(await page.innerText("body")).toBe(
    "#test-ele { background-color: red; color: rgb(0, 0, 255); }"
  );
});

test("load lm-css", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/load-module/lm-css.html");

  await new Promise((resolve) => setTimeout(resolve, 500));

  // 获取 #test-ele 元素
  const testElement = await page.$("#test-ele");

  // 获取背景色和字体颜色
  const backgroundColor = await testElement.evaluate((element) => {
    return window.getComputedStyle(element).backgroundColor;
  });

  const color = await testElement.evaluate((element) => {
    return window.getComputedStyle(element).color;
  });

  await expect(backgroundColor).toBe("rgb(255, 0, 0)");
  await expect(color).toBe("rgb(0, 0, 255)");
});
