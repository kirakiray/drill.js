import path from "path";
import fs from "fs";
import commonjs from "@rollup/plugin-commonjs";
import jsonjs from "@rollup/plugin-json";

const CWD = process.cwd();
let PACKAGE = fs.readFileSync(path.join(CWD, "package.json"));
PACKAGE = JSON.parse(PACKAGE);

const banner = `//! ${PACKAGE.name} - v${PACKAGE.version} ${
  PACKAGE.homepage
}  (c) ${PACKAGE.startyear}-${new Date().getFullYear()} ${PACKAGE.author.name}`;

export default [
  {
    input: "libs/less/src/main.js",
    output: [
      {
        file: "libs/less/dist/less-drill.mjs",
        format: "iife",
        banner,
      },
      {
        file: "libs/less/dist/less-drill.js",
        format: "umd",
        name: "lm",
        banner,
      },
    ],
    plugins: [commonjs(), jsonjs()],
  },
  {
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
  },
];
