const path = require("path");

const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, "package.json"));

module.exports = async ({ name, bundler }) => {
  if (name.split(".").pop() === "js" && bundler.options.production) {
    return {
      header: `// ${PACKAGE.name} - v${PACKAGE.version} ${
        PACKAGE.homepage
      }  (c) ${
        PACKAGE.startyear
      }-${new Date().getFullYear()} ${PACKAGE.author.name}`,
    };
  }
};
