const express = require('express');
const expressStatic = require('express-static');
const bodyParser = require('body-parser');
const server = express();


//  先加工一次才能使用body-parser,在这个步骤添加了req.body
server.use(bodyParser.urlencoded({
	limit: 2 * 1024 * 1024,                 //  限制大小
}));
server.use('/login', function (req, res) {
	console.log(req.body);
});


//  响应请求,三种接收请求的方法方式   get,post,use
(function () {
	return
	server.use('/a.html', function (req, res) {
		res.send({a: 12, b: 22});
		res.end();
	});
	server.get('/', function (req, res) {
		console.log('get请求');
		res.send({a: 12, b: 22});
		res.end();
	});
	server.post('/', function (req, res) {
		console.log('post请求');
		res.send({a: 12, b: 22});
		res.end();
	});

	const users = {
		'123': '123',
	};
	// 接口
//  login?user=xx&pass=xx
//  =>{ok:true,msg:'xx'}
	server.get('/login', function (req, res) {
		console.log(req.query);
		let user = req.query['user'];
		let password = req.query['password'];

	});
}());


//  多个use可以进行链式调用,但需要同一路径
//  链式调用需要next
server.use('/next', function (req, res, next) {
	console.log('next1');
	next()
});
server.use('/next', function (req, res, next) {
	console.log('next2');
	next()
});
//  静态文件
server.use(expressStatic('./'));
const port = 8848;
server.listen(port);

