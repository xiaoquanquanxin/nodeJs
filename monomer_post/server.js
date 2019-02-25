const http = require('http');
const querystring = require('querystring');
const server = http.createServer(function (req, res) {
	//  接收字符串
	let str = '';
	let i = 0;
	//  有一段数据到达的时候,触发
	req.on('data', function (data) {
		console.log(`第${++i}次接收`);
		str += data;
	});
	//  全部数据接收到了
	req.on('end', function () {
		let post = querystring.parse(str);
		console.log(post);
		res.write(`接收成功`);
		res.end();
	});
});
const port = 8848;
server.listen(port);