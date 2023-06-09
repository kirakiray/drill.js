import defaultOptions from "less/lib/less/default-options";
import addDefaultOptions from "less/lib/less-browser/add-default-options";

import root from "./less-browser-index-dev";
import init from "./init";

const options = defaultOptions();

addDefaultOptions(window, options);

options.plugins = options.plugins || [];

const less = root(window, options);

init(less);

// export default less;
