module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  moduleFileExtensions: ["js", "mjs"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testMatch: [
    "**/*.test.js", // 使用 Glob 模式匹配需要测试的文件
  ],
  testPathIgnorePatterns: [
    "/node_modules/", // 排除 node_modules 目录下的文件
  ],
};
