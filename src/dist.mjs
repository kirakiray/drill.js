import drill from "./base.mjs";

export default drill;

if (typeof global !== "undefined") {
  global.drill = drill;
}
