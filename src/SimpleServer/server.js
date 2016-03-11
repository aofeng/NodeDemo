/**
 * 服务器实例。
 * @author NieYong<aofengblog@163.com>
 */

var http = require("http");

function start(port, router) {
	function onRequest(request, response) {
		router.route(request, response);
	}
	
	http.createServer(onRequest).listen(port);
	console.log("http server started, listen port "+port);
}

exports.start = start;
