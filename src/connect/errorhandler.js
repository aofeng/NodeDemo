/**
 * 错误处理。
 * 
 * @author NieYong<aofengblog@163.com>
 */

var http = require("http");
var port = 8000;
var connect = require("connect");
var errorhandler = require("errorhandler");

var app = connect();
app.use("/error", function(request, response, next) {
    var error = new Error("就是故意的");
    error.status = 500;
    next(error);
});
app.use(errorhandler({
    log : errorHandler
}));

// 启动服务
http.createServer(app).listen(port);
console.log("http server with error handler started, listen port " + port);

function errorHandler(err, str, request, response) {
    var title = "URL：" + request.url + ", Method：" + request.method + " occurs error.";
    console.error(title + str, err);
}
