lm.use(["js", "mjs"], async (ctx, next) => {
  const { content, tag, type, style } = ctx.result;

  if (type === "component") {
    class MyElement extends HTMLElement {
      constructor() {
        super();
        this.innerHTML = content;
        style && Object.assign(this.style, style);
      }
    }

    customElements.define(tag, MyElement);
  }

  next();
});
