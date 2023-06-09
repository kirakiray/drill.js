export default (less) => {
  if (typeof lm !== "undefined") {
    lm.use("less", async ({ url, element }) => {
      const text = await fetch(url).then((e) => e.text());

      if (!element) {
        return text;
      }

      const data = await less.render(text, { sourceMap: {} });

      const m = JSON.parse(data.map);
      m.sources = [url];

      const cssUrl = createFileUrl(
        [
          data.css +
            `\n/*# sourceMappingURL=data:application/json;base64,${btoa(
              JSON.stringify(m)
            )} */`,
        ],
        "test.css"
      );

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssUrl;

      const root = element.getRootNode();

      if (root === document) {
        document.head.append(link);
      } else {
        root.appendChild(link);
      }
    });
  } else {
    window.less = less;
  }
};

const createFileUrl = (...args) => URL.createObjectURL(new File(...args));
