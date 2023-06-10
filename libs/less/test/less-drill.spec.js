import { test, expect } from "@playwright/test";

const getStyle = async (
  page,
  selector,
  keys = ["width", "height", "backgroundColor", "borderColor", "color"]
) => {
  const { _preview: styleStr } = await page.waitForFunction(
    async ({ selector, keys }) => {
      const reobj = {};

      const styleObj = getComputedStyle(document.querySelector(selector));

      keys.forEach((k) => {
        reobj[k] = styleObj[k];
      });

      return JSON.stringify(reobj);
    },
    { selector, keys }
  );

  return JSON.parse(styleStr);
};

test("less drill", async ({ page }) => {
  await page.goto("http://localhost:3340/libs/less/test/less-test.html");

  await new Promise((res) => setTimeout(res, 600));

  const headerStyle = await getStyle(page, "#header");

  expect(headerStyle.width).toBe("100px");
  expect(headerStyle.height).toBe("110px");
  expect(headerStyle.backgroundColor).toBe("rgb(238, 238, 238)");

  const menuAStyle = await getStyle(page, "#menu a");

  expect(menuAStyle.color).toBe("rgb(0, 255, 0)");
  expect(menuAStyle.borderColor).toBe("rgb(255, 0, 0)");

  const postAStyle = await getStyle(page, ".post a");

  expect(postAStyle.color).toBe("rgb(255, 0, 255)");
  expect(postAStyle.borderColor).toBe("rgb(255, 0, 0)");
});
