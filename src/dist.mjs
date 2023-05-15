import lm from "./base.mjs";

if (typeof window !== "undefined") {
  window.lm = lm;
}

if (typeof module === "object") {
  module.exports = lm;
}
