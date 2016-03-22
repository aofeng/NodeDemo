/**
 * 第一个express框架的node应用。
 * 
 * @author NieYong<aofengblog@163.com>
 */

var express = require("express");

var app = express();
var port = 8000;
app.get("/", function(req, res) {
    res.send("Hello express!");
});
app.listen(port, function() {
    console.log("http server with express listen on " + port);
});
