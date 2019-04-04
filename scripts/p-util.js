const zlib = require('zlib');
const util = require('util');
const querystring = require("querystring");

Object.assign(exports, {
    gzip: util.promisify(zlib.gzip)
});

// 获取POST的data
exports.getPostData = (req) => new Promise((reslove, reject) => {
    let body = "";
    // isBuffer;
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        let data;
        let contentType = req.headers['content-type'];
        switch (contentType) {
            case "application/x-www-form-urlencoded":
                data = querystring.parse(body);
                break;
            case "application/json":
                data = JSON.parse(body);
                break;
            case "text/plain":
                data = body;
                break;
            case "b64json":
                data = JSON.parse(body);
                //过滤data:URL
                let base64Data = data.file.replace(/^data:image\/\w+;base64,/, "");
                data.file = new Buffer(base64Data, 'base64');
                break;
        }
        reslove(data);
    });
});;