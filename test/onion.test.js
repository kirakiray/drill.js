import { test, expect } from "vitest";
import Onion from "../src/onion.mjs";

test("Onion test", async () => {
  const oni = new Onion();

  const saver = [];

  oni.use(async (ctx, next) => {
    await new Promise((res) => setTimeout(res, 500));
    saver.push("a" + ctx.num);
    ctx.num++;

    await next();

    saver.push("a" + ctx.num);
    ctx.num++;
  });

  const oid = oni.use(async (ctx, next) => {
    saver.push("b" + ctx.num);
    ctx.num++;

    await next();

    saver.push("b" + ctx.num);
    ctx.num++;
  });

  oni.use(async (ctx, next) => {
    saver.push("c" + ctx.num);
    ctx.num++;

    await next();

    saver.push("c" + ctx.num);
    ctx.num++;
  });

  await oni.run({
    num: 0,
  });

  expect(saver).toEqual(["a0", "b1", "c2", "c3", "b4", "a5"]);

  saver.splice(0, 10000);

  oni.unuse(oid);

  await oni.run({
    num: 100,
  });

  expect(saver).toEqual(["a100", "c101", "c102", "a103"]);
});
