lm.use(["js", "mjs"], async (ctx, next) => {
  const { content, tag, type } = ctx.result;

  if (type === "component") {
    class MyElement extends HTMLElement {
      constructor() {
        super();
        this.innerHTML = content;
      }
    }

    customElements.define(tag, MyElement);
  }

  next();
});
