const { server, home } = require("./static-server");
const shell = require("shelljs");

// 运行命令行命令
shell.exec(`npx playwright test`, function (code, stdout, stderr) {
  console.log("Exit code:", code);
  console.log("Program output:", stdout);
  console.log("Program stderr:", stderr);
  server.close();
  if (code !== 0) {
    throw "run error";
  }
});
