const { test, expect } = require("@playwright/test");

test("load module are all correct", async ({ page }) => {
  await page.goto("http://localhost:3340/test/statics/load-module.html");

  await new Promise((res) => setTimeout(res, 1000));

  await expect((await page.$$(".jasmine-specs .jasmine-passed")).length).toBe(
    4
  );
});
