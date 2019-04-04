const fs = require('fs');
const util = require('util');

// 暴露给外部用的对象
let exportsObj = {
    // access的修改版，是否有权限
    permit: (path, mode = fs.constants.R_OK) => new Promise((res) => {
        fs.access(path, mode, (err, data) => {
            if (err) {
                res(0);
            } else {
                res(1);
            }
        })
    })
};

// 需要添加promise的方法名
var funArr = ['stat', 'lstat', 'fstat', 'copyFile', 'readdir', 'mkdir', 'rmdir', 'readFile', 'writeFile', 'appendFile', 'unlink', 'rename', 'chown'];

funArr.forEach((funName) => {
    if (fs[funName]) {
        exportsObj[funName] = util.promisify(fs[funName]);
    } else {
        console.warn('函数不存在', funName);
    }
});

// 暴露
module.exports = exportsObj;