import lm from "./main.mjs";
import "./component.mjs";

if (typeof window !== "undefined") {
  window.lm = lm;
}

if (typeof module === "object") {
  module.exports = lm;
}
