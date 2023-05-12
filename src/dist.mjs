import lm from "./main.mjs";

if (typeof global !== "undefined") {
  global.lm = lm;
}
