import defaultOptions from "less/lib/less/default-options";
import addDefaultOptions from "less/lib/less-browser/add-default-options";

export default (root, hasSourceMap = 1) => {
  const options = defaultOptions();

  addDefaultOptions(window, options);

  options.plugins = options.plugins || [];

  const less = root(window, options);

  if (typeof lm !== "undefined") {
    lm.use("less", async ({ url, element }) => {
      const text = await fetch(url).then((e) => e.text());

      if (!element) {
        return text;
      }

      const opts = {};

      if (hasSourceMap) {
        opts.sourceMap = {};
      }

      const data = await less.render(text, opts);

      let m;

      if (hasSourceMap) {
        m = JSON.parse(data.map);
        m.sources = [url];
      }

      const cssUrl = createFileUrl(
        [
          data.css +
            (hasSourceMap
              ? `\n/*# sourceMappingURL=data:application/json;base64,${btoa(
                  JSON.stringify(m)
                )} */`
              : ""),
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