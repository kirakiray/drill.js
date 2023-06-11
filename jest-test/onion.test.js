// import Onion from "../src/onion.mjs";
const Onion = require('../src/onion.mjs');

describe("Onion", () => {
  let onion;

  beforeEach(() => {
    onion = new Onion();
  });

  test("should add middleware using use method", () => {
    const middleware = jest.fn();
    const oid = onion.use(middleware);

    expect(onion._middlewares.has(oid)).toBe(true);
    expect(onion._middlewares.get(oid)).toBe(middleware);
  });

  test("should remove middleware using unuse method", () => {
    const middleware = jest.fn();
    const oid = onion.use(middleware);

    onion.unuse(oid);

    expect(onion._middlewares.has(oid)).toBe(false);
  });

  test("should run middlewares in correct order", async () => {
    const middleware1 = jest.fn((context, next) => {
      context.calls.push("middleware1");
      return next();
    });

    const middleware2 = jest.fn((context, next) => {
      context.calls.push("middleware2");
      return next();
    });

    const middleware3 = jest.fn((context, next) => {
      context.calls.push("middleware3");
      return next();
    });

    const context = { calls: [] };
    onion.use(middleware1);
    onion.use(middleware2);
    onion.use(middleware3);

    await onion.run(context);

    expect(middleware1).toHaveBeenCalledTimes(1);
    expect(middleware2).toHaveBeenCalledTimes(1);
    expect(middleware3).toHaveBeenCalledTimes(1);

    expect(context.calls).toEqual([
      "middleware1",
      "middleware2",
      "middleware3",
    ]);
  });
});
