import { test, expect } from "@playwright/test";

test("typescript drill", async ({ page }) => {
  await page.goto("http://localhost:3340/libs/typescript/test/typescript-test.html", {
    waitUntil: "networkidle",
  });
  await new Promise((res) => setTimeout(res, 600));
  const tranship  =await page.getByTestId('tranship')
  const transhipText = await tranship.textContent();
  expect(transhipText).toBe("Translated");

  const helloWorld  =await page.getByTestId('hello-world')
  const helloWorldText = await helloWorld.textContent();
  expect(helloWorldText).toBe("2,3,4,Hello,World");
});
