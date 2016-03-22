/**
 * 路由。
 * 
 * @author NieYong<aofengblog@163.com>
 */

var express = require("express");
var app = express();
var port = 8000;

// 同一个PATH可以拥有多个不同的METHOD
app.get("/hi", function(req, res) {
    res.send("hi, get");
});
app.post("/hi", function(req, res) {
    res.send("hi, post");
});

// 所有METHOD使用同一个处理器
app.all("/hello", function(req, res) {
    res.send("hello, all");
});

// 精确匹配
app.get("/public/1", function(req, res) {
    res.send("hit path /public/1");
});

// 字符串模式匹配(/public, /public123)
app.get("/public(123)?", function(req, res) {
    res.send("hit path " + req.path);
});
//字符串模式匹配(/go1, /goal2, /go-hi1等)
app.get("/go*1", function(req, res) {
    res.send("hit path " + req.path);
});

// 一个PATH有多个处理器
app.get("/multi", [multi1, multi2]);

// 上述之外的PATH，全部由这里处理
app.use(function(req, res) {
    res.end("don't worry, everything is OK!");
});

app.listen(port);
console.log("http server started on port " + port);

function multi1(req, res, next) {
    console.log("handler 'multi1' process compleete");
    next();
}

function multi2(req, res, next) {
    console.log("handler 'multi2' process compleete");
    res.send("multi handler process complete");
}
