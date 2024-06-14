module.exports = async (app) => {
  // test server render
  app.use(async (ctx) => {
    const { originalUrl } = ctx;

    if (originalUrl === "/_test_js") {
      ctx.set("Content-Type", "application/javascript; charset=utf-8");
      ctx.body = `
      export const val = 'I am _test_js';
      `;
    }
  });
};
