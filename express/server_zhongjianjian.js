/****
 * 中间件
 ******/

const express = require('express');
const myBodyParser = require('./my-body-parser');
let server = express();
const port = 8848;
server.listen(port);

server.use(myBodyParser());
server.use('/', function (req, res, next) {
	console.log(req.body);
});

//  bodyparser的原理就是,在第一个中间件种解析body,加到req中
//  忧郁req是会传递的,就会在调用next后执行下一个中间件
