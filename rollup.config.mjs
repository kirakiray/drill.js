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

const lessBanner = `// less-drill ${
  PACKAGE.homepage
}/tree/main/libs/less  (c) ${PACKAGE.startyear}-${new Date().getFullYear()} ${
  PACKAGE.author.name
}`;

export default [
  // {
  //   input: "libs/typescript/src/main.js",
  //   output: [
  //     {
  //       file: "libs/typescript/dist/ts-drill.js",
  //       format: "umd",
  //     },
  //   ],
  //   plugins: [commonjs(), resolve(), jsonjs()],
  // },
  // {
  //   input: "libs/typescript/src/main.js",
  //   output: [
  //     {
  //       file: "libs/typescript/dist/ts-drill.min.js",
  //       format: "umd",
  //       sourcemap: true,
  //     },
  //   ],
  //   plugins: [commonjs(), resolve(), jsonjs(), terser()],
  // },
  // {
  //   input: "libs/typescript/src/main-dev.js",
  //   output: [
  //     {
  //       file: "libs/typescript/dist/ts-drill-dev.js",
  //       format: "umd",
  //       sourcemap: true,
  //     },
  //   ],
  //   plugins: [commonjs(), resolve(), jsonjs()],
  // },
  {
    input: "libs/less/src/main.js",
    output: [
      {
        file: "libs/less/dist/less-drill.js",
        format: "es",
        banner: lessBanner,
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
        banner: lessBanner,
        sourcemap: true,
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
        banner: lessBanner,
        sourcemap: true,
      },
    ],
    plugins: [commonjs(), resolve(), jsonjs(), terser()],
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
        sourcemap: true,
      },
      {
        file: "dist/drill.min.js",
        format: "umd",
        name: "lm",
        banner,
        sourcemap: true,
      },
    ],
    plugins: [terser()],
  },
];
