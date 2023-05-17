const path = require("path");
const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, "package.json"));

const banner = `//! ${PACKAGE.name} - v${PACKAGE.version} ${
  PACKAGE.homepage
}  (c) ${PACKAGE.startyear}-${new Date().getFullYear()} ${PACKAGE.author.name}`;

module.exports = {
  input: "src/base.mjs",
  output: [
    {
      file: "dist/drill.mjs",
      format: "es",
      banner,
    },
    {
      file: "dist/drill.js",
      format: "umd",
      name: "lm",
      banner,
    },
  ],
  plugins: [],
};
