const http = require('http');
//  创建一个server对象
//  有人访问的回调
const server = http.createServer(function (request, response) {
	console.log(`有人来了:${request.url}`);
	switch (request.url) {
		case "/1.html":
			response.write('11111aaa');
			break;
		case '/2.html':
			response.write('222222222');
			break;
		default :
			response.write('404');
	}
	response.end();
});
const port = 1231;
//  监听  参数是端口
server.listen(port);