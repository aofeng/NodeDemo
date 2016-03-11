var http = require("http");

function start(port, router) {
	function onRequest(request, response) {
		router.route(request, response);
	}
	
	http.createServer(onRequest).listen(port);
	console.log("http server started, listen port"+port);
}

exports.start = start;
