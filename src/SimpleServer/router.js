/**
 * 路由器。
 * @author NieYong<aofengblog@163.com>
 */

var url = require("url");
var handler = require("./handler");
var config = {
        "/" : handler.index,
        "/upload" : handler.upload
};

function route(request, response) {
    var path = url.parse(request.url).pathname;
    console.log("request: " + request.method + " " + path);
    var reqHandler = config[path];
    if (typeof reqHandler == "function") {
        reqHandler(request, response);
    } else {
        console.log("path " + path + " hasn't handler");
        response.writeHead(404, {"Content-Type" : "text/plain"});
        response.write("很可惜，找不到你所需的资源！");
        response.end();
    }
}

exports.route = route;
