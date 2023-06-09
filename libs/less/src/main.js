import defaultOptions from "less/lib/less/default-options";
import addDefaultOptions from "less/lib/less-browser/add-default-options";

// import root from "less/lib/less-browser/index";
import root from "./lb-index";

const options = defaultOptions();

if (window.less) {
  for (const key in window.less) {
    if (Object.prototype.hasOwnProperty.call(window.less, key)) {
      options[key] = window.less[key];
    }
  }
}
addDefaultOptions(window, options);

options.plugins = options.plugins || [];

const less = root(window, options);
export default less;

window.less = less;
