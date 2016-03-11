/**
 * 服务入口。
 * @author NieYong<aofengblog@163.com>
 */

var server = require("./server");
var router = require("./router");
server.start(8000, router);
