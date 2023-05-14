const fs = require("fs");
const path = require("path");
const CWD = process.cwd();
const PACKAGE = require(path.join(CWD, "package.json"));

const comment = `// ${PACKAGE.name} - v${PACKAGE.version} ${
  PACKAGE.homepage
}  (c) ${PACKAGE.startyear}-${new Date().getFullYear()} ${PACKAGE.author.name}`;

const dirPath = "dist";

fs.readdirSync(dirPath).forEach(function (file) {
  const filePath = path.join(dirPath, file);
  const extName = path.extname(filePath);

  if (extName === ".js") {
    console.log(filePath);
    fs.writeFileSync(
      filePath,
      `${comment}\n${fs.readFileSync(filePath, "utf-8")}`,
      "utf-8"
    );
  }
});
