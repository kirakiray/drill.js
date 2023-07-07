const { test, expect } = require("@playwright/test");

test("load module are all correct", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/load-module.html");

  await new Promise((res) => setTimeout(res, 1200));

  await expect((await page.$$(".jasmine-specs .jasmine-passed")).length).toBe(
    7
  );
});

test("use", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/use.html");

  await new Promise((res) => setTimeout(res, 300));

  const { _preview: p1 } = await page.waitForFunction(async () => {
    return JSON.stringify(uses);
  });

  const data1 = JSON.parse(p1);

  await expect(data1.length).toBe(2);

  await page.waitForFunction(async () => {
    document.querySelector("#target-lm").removeAttribute("pause");
  });

  await new Promise((res) => setTimeout(res, 300));

  const { _preview: p2 } = await page.waitForFunction(async () => {
    return JSON.stringify(uses);
  });

  const data2 = JSON.parse(p2);

  await expect(data2.length).toBe(3);
});

test("load module count with parameters", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/cache.html");

  await new Promise((res) => setTimeout(res, 100));

  await expect(await page.innerText("body")).toBe("1");

  await page.waitForFunction(async () => {
    await load("./esm/test-count.mjs -direct"); // This will not work because it was loaded
    document.body.innerHTML = mCount;
  });

  await expect(await page.innerText("body")).toBe("1");

  await page.waitForFunction(async () => {
    await load("./esm/test-count.mjs?v=2 -direct"); // with v=2 has not been loaded, so it will re-enter a new module
    document.body.innerHTML = mCount;
  });

  await new Promise((res) => setTimeout(res, 100));

  await expect(await page.innerText("body")).toBe("2");
});

test("param type", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/param-type.html");

  await new Promise((res) => setTimeout(res, 100));

  await expect(await page.innerText("body")).toBe("string");
});
