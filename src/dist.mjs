import lm from "./main.mjs";

if (typeof window !== "undefined") {
  window.lm = lm;
}
