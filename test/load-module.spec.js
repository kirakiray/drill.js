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
