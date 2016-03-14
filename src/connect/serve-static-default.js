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
    "dotfiles" : "ignore",
    "etag" : true,
    "extensions" : false,
    "fallthrough" : true,
    "index" : "index.html",
    "lastModified" : true,
    "maxAge" : 0,
    "redirect" : true,
    
}));

// 启动服务
http.createServer(app).listen(port);
console.log("http server started, listen port " + port);