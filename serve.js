//Node web server by Tim Beattie (github.com/timbt)

var http = require('http'),
	fs = require('fs'),
	path = require('path');


//Used for content type type handling in response.writeHead()
var contentType = {
	".html" : "text/html",
	".css" : "text/css",
	".txt" : "text/plain",
	".js" : "application/javascript",
	".json" : "application/json",
	".pdf" : "application/pdf",
	".rss" : "application/rss+xml",
	".xml" : "application/xml",
	".gif" : "image/gif",
	".jpg" : "image/jpeg",
	".png" : "image/png"
};

var httpHandler = function(request, response){

	var file = __dirname + "/public" + request.url;
	var errorPage = __dirname + "/public/404.html";
	if (!path.extname(request.url)) //Default to index.html if no file specified.
		file += "/index.html";
		//console.log(file); //For checking url-parsing behaviour

	fs.readFile(file, function(error, content){
		if (error){
			fs.readFile(errorPage, function (error404, content404){
				if (error404) {
					console.log("someone's really fucked up.");
					console.log(error404);
					response.end("The server is probably broken right now.");
				}

				else {
					response.end(content404);
				}
			});
		}

		else {
			response.writeHead(200, {"Content-Type": contentType[path.extname(file)]});
			response.end(content);
		}
	});
};

http.createServer(httpHandler).listen(80);
