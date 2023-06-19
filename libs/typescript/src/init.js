import { getDefaultCompilerOptions, transpileModule } from "typescript";

export default ({ isSourceMap = true } = {}) => {
  if (typeof lm !== "undefined") {
    lm.use("ts", async (ctx, next) => {
      const { url, element } = ctx;
      const tsCode = await fetch(url).then((e) => e.text());

      if (!element) {
        ctx.result = tsCode;

        next();
        return;
      }
      const jsCode = await transpileTypeScriptToJavaScript(tsCode, {
        isSourceMap,
      });
      const fileUrl = URL.createObjectURL(
        new File([jsCode], {
          type: "application/javascript",
        })
      );
      const script = document.createElement("script");
      script.src = fileUrl;

      const root = element.getRootNode();
      if (root === document) {
        root.body.appendChild(script);
      } else {
        root.appendChild(script);
      }
    });
  }
};

async function transpileTypeScriptToJavaScript(tsCode, { isSourceMap } = {}) {
  const options = getDefaultCompilerOptions();

  const result = transpileModule(tsCode, {
    compilerOptions: {
      ...options,
      strict: true,
      inlineSourceMap: isSourceMap ? true : false,
      inlineSources: isSourceMap ? true : false,
      target: "ES6",
      useCaseSensitiveFileNames: true,
      cache: true,
    },
  });
  return result.outputText;
}
