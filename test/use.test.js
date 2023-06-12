import { test, expect } from "vitest";
import { use, processor } from "../src/use.mjs";

test("use test", async () => {
  const saver = [];

  use("csv", async (ctx, next) => {
    saver.push("a" + ctx.num);
    ctx.num++;

    await next();

    saver.push("a" + ctx.num);
    ctx.num++;
  });

  use("csv", async (ctx, next) => {
    saver.push("b" + ctx.num);
    ctx.num++;

    await next();

    saver.push("b" + ctx.num);
    ctx.num++;
  });

  use("csv", async (ctx, next) => {
    saver.push("c" + ctx.num);
    ctx.num++;

    await next();

    saver.push("c" + ctx.num);
    ctx.num++;
  });

  await processor["csv"].run({
    num: 0,
  });

  expect(saver).toEqual(["a0", "b1", "c2", "c3", "b4", "a5"]);
});
