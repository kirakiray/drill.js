const http = require('http');
// const https = require('https');
const urltool = require('url');
const pfs = require('./pfs');
const putil = require('./p-util');
const querystring = require("querystring");
const fs = require('fs');

// PieServer
const PieServer = function () {
    // web根目录地址，默认cwd的地址
    let rootdir = process.cwd();

    // 空目录的引用文件名
    let indexFileName = "index.html";

    // 目录初始映射
    let dirMap = new Map();

    // 连接器
    let connector = new Map();

    Object.defineProperties(this, {
        "rootdir": {
            set: (val) => {
                rootdir = val
            },
            get: () => {
                return rootdir;
            }
        },
        "indexName": {
            set: (val) => {
                indexFileName = val;
            },
            get: () => {
                return indexFileName;
            }
        },
        "dirMap": {
            get: () => dirMap
        },
        "connector": {
            get: () => connector
        }
    });

    // MIMEMap类型返回
    let mimeMap = this.mimeMap = new Map([
        [".bmp", "image/bmp"],
        [".png", "image/png"],
        [".gif", "image/gif"],
        [".jpg", "image/jpeg"],
        [".svg", "image/svg+xml"],
        [".html", "text/html"],
        [".htm", "text/html"],
        [".js", "application/javascript"],
        [".css", "text/css"],
        [".appcache", "text/cache-manifest"],
        [".json", "application/json"],
        [".map", "application/octet-stream"]
    ]);

    // 创建服务器
    let server = this.server = http.createServer();

    // 监听变动
    server.on('request', async (request, respone) => {
        // 转换成url对象，方便后续操作
        let urlObj = urltool.parse(request.url);

        // 获取pathname，并修正文件地址
        let {
            pathname
        } = urlObj;

        // 是否映射了地址
        let isMapUrl = 0;

        // 判断是否在映射目录内
        let firstDir = /\/(.+?)\//.exec(request.url);
        if (firstDir) {
            firstDir = firstDir[1];
            let mapUrl = dirMap.get(firstDir);
            if (mapUrl) {
                pathname = pathname.replace("/" + firstDir, mapUrl);
                isMapUrl = 1;
            }
        }

        // 没有映射就按当前根目录走逻辑
        if (!isMapUrl) {
            if (/\/$/.test(pathname)) {
                pathname += indexFileName;
            }
            pathname = rootdir + pathname;
            pathname = decodeURIComponent(pathname);
        }

        // 请求头
        let headers = request.headers;

        // 返回头
        let headData = {
            // 服务器类型
            'Server': "PieServer",
            'access-control-allow-origin': "*"
            // 添加max-age（http1.1，一直缓存用；免去使用Etag和lastModify判断，只用版本号控制）
            // 'Cache-Control': "max-age=315360000"
        };

        // 获取后缀并设置返回类型
        let suffix = /(.+)(\..+)$/g.exec(pathname.toLowerCase());
        suffix = suffix && suffix[2];

        // mime类型
        let mime;
        if (suffix) {
            mime = mimeMap.get(suffix);
            if (mime) {
                headData['Content-Type'] = mime;
            }
        }

        // 图片的话断流返回数据
        if (mime && mime.search('image') > -1) {
            try {
                let imgstat = await pfs.stat(pathname);

                // 设置文件大小
                headData['Content-Length'] = imgstat.size;

                // 写入头数据
                respone.writeHead(200, headData);
                let readStream = fs.createReadStream(pathname);

                readStream.pipe(respone);

                // readStream.on('data', (chunk) => {
                //     if (respone.write(chunk) === false) {
                //         // 如果没有写完，暂停读取流
                //         readStream.pause();
                //     }
                // });

                // respone.on('drain', () => {
                //     // 写完后，继续读取
                //     readStream.resume();
                // });

                // // 获取数据结束
                // readStream.on('end', () => {
                //     respone.end();
                // });
            } catch (e) {
                // 不存在就返回错误
                respone.writeHead(404);
                respone.end("error : no file");
            }
        } else {
            let isRunConnector = 0;
            let file;

            // 获取发送的data数据
            let data;
            switch (request.method) {
                case "POST":
                    data = await putil.getPostData(request);
                    break;
                case "GET":
                    data = querystring.parse(urlObj.query);
                    break;
            }

            // 判断是否在connector里面
            for (let a of connector) {
                if (urlObj.pathname == a[0]) {
                    file = await a[1]({
                        data,
                        request
                    });
                    isRunConnector = 1;
                    break;
                }
            }
            try {
                if (!isRunConnector) {
                    // 获取文件
                    file = await pfs.readFile(pathname);
                }

                // 判断能接受gzip类型
                let acceptCode = headers['accept-encoding'];
                if (acceptCode && acceptCode.search('gzip') > -1) {
                    // 转换gzip
                    file = await putil.gzip(file);

                    // 添加gz压缩头信息
                    headData['Content-Encoding'] = 'gzip';
                }

                // 设置文件大小
                headData['Content-Length'] = file.length;

                // 存在文件，就返回数据
                respone.writeHead(200, headData);
                respone.end(file);
            } catch (e) {
                // 不存在就返回错误
                respone.writeHead(404);
                respone.end("error : no data");
                console.warn("no file => ", pathname);
            }
        }
    });
};

PieServer.prototype = {
    //监听端口
    listen(port) {
        this.server.listen(port);
    },
    //事件监听
    on() {
        this.server.on.apply(this.server, arguments);
    },
    close() {
        this.server.close();
    }
};

Object.defineProperties(PieServer.prototype, {
    //获取监听接口
    "port": {
        get: function () {
            return this.server.address().port;
        }
    }
});

module.exports = PieServer;