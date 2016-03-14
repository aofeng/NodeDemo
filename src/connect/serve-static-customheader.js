/**
 * 服务入口。
 * 
 * @author NieYong<aofengblog@163.com>
 */

var http = require("http");
var port = 8000;
var connect = require("connect");
var serverStatic = require("serve-static");

// 建立Connect应用
var app = connect();
app.use(serverStatic("/home/nieyong", {
    "setHeaders" : addHeader
}));

// 启动服务
http.createServer(app).listen(port);
console.log("http server started, listen port " + port);

function addHeader(res, path) {
    if (serverStatic.mime.lookup(path) === 'text/html') {
        res.setHeader('Hello', 'serve-static');
    }
}
