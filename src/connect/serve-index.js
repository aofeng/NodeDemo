/**
 * 目录列表。
 * 
 * @author NieYong<aofengblog@163.com>
 */

var http = require("http");
var port = 8000;
var connect = require("connect");
var serverStatic = require("serve-static");
var serverIndex = require("serve-index");

var app = connect();
app.use(serverStatic("/home/nieyong"));
app.use(serverIndex("/home/nieyong", {
    "icons" : true,
    "hidden" : false,
    "view" : "details"   // 默认为"tiles", 也可以是["tiles", "details"]
}));

http.createServer(app).listen(port);
console.log("http server with directory list started, listen port " + port);
