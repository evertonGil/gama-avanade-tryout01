var http = require("http");
var fs = require("fs");
var path = require("path");

function startServer(port) {
	var serverObj = http.createServer(function(request, response) {

		//console.log("Request: " + request.url);

		if (request.url == '/')	{
			resourcePath = "public/index.html";
			//console.log("resourcePath1: /");
		}
		else {
			resourcePath = "public" + request.url;
			//console.log("resourcePath2:" + resourcePath);
		}

		var contentType = getContentType(resourcePath);

		fs.readFile(resourcePath, function(err, data){
			if (err) {
				response.writeHead(404, err);
				//console.log("erro:" + err);
			}
			else {
				
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
				response.end();
			}
		});


	}).listen(port);
	return serverObj;
}

const contentTypeMap = { html: "text/html", css: "text/css", jpg: "image/jpg", js: "text/javascript", ico: "image/x-icon" }
function getContentType(resourcePath) {
	//console.log("resourcePath3: " + resourcePath);
	var ext = path.extname(resourcePath).replace('.', '');
	//console.log("contentTypeMap3: " + contentTypeMap[ext]);

	return contentTypeMap[ext]
}

exports.startServer = startServer

var port;
process.argv.forEach(function (val, index, array) {
  if (index == 2 && Number(val)) 
  	port = val
});
if (port) startServer(port)