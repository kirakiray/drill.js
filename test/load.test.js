import { test, expect } from "vitest";
import config, { path } from "../src/config.mjs";

test("path test", async () => {
  config({
    alias: {
      "@t": "https://aaa.com/",
    },
  });

  const url = path("@t/a.html");

  expect(url).toBe("https://aaa.com/a.html");
});
