const fs = require("fs");
const path = require("path");
const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, "package.json"));

const comment = `// ${PACKAGE.name} - v${PACKAGE.version} ${
  PACKAGE.homepage
}  (c) ${PACKAGE.startyear}-${new Date().getFullYear()} ${PACKAGE.author.name}`;

console.log(comment);

["dist/drill.dev.js", "dist/drill.js"].forEach((path) => {
  fs.writeFileSync(
    path,
    `${comment}\n${fs.readFileSync(path, "utf-8")}`,
    "utf-8"
  );
});
