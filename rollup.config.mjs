import path from "path";
import fs from "fs";
import commonjs from "@rollup/plugin-commonjs";
import jsonjs from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

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
        file: "libs/less/dist/less-drill.js",
        format: "es",
        banner,
      },
    ],
    plugins: [commonjs(), resolve(), jsonjs()],
  },
  {
    input: "libs/less/src/main.js",
    output: [
      {
        file: "libs/less/dist/less-drill.min.js",
        format: "es",
        banner,
      },
    ],
    plugins: [commonjs(), resolve(), jsonjs(), terser()],
  },
  {
    input: "libs/less/src/main-dev.js",
    output: [
      {
        file: "libs/less/dist/less-drill-dev.js",
        format: "es",
        name: "less",
        banner,
      },
    ],
    plugins: [commonjs(), resolve(), jsonjs()],
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
  {
    input: "src/base.mjs",
    output: [
      {
        file: "dist/drill.min.mjs",
        format: "es",
        banner,
      },
      {
        file: "dist/drill.min.js",
        format: "umd",
        name: "lm",
        banner,
      },
    ],
    plugins: [terser()],
  },
];
