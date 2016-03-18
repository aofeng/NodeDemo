/**
 * 压缩处理。
 * @author NieYong<aofengblog@163.com>
 */

var http = require("http");
var port = 8000;
var connect = require("connect");
var compress = require("compression");
var serverStatic = require("serve-static");

var app = connect();
// 开启压缩
app.use(compress({filter:customCompress, level:9}));

// 开启静态文件服务
app.use(serverStatic("/home/nieyong/"));

// 启动服务
http.createServer(app).listen(port);
console.log("http server with compression started, listen port " + port);

function customCompress(request, response) {
    if (request.headers["no-compress"]) {
        return false;
    }
    
    return compress.filter(request, response);
}
