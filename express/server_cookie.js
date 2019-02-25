//  cookie-parser
//  cookie-session
const express = require('express');


const server = express();
const port = 8848;
server.listen(port);

//  cookie
// server.use('/', function (req, res) {
// 	res.cookie('user', '123', {path: '/aaa', maxAge: 30 * 1000 * 3600 * 24});
// 	res.send('1234');
// });


const cookieParser = require('cookie-parser');
server.use(cookieParser('jfewia'));
// server.use('/', function (req, res) {
// 	console.log(req.cookies, '在上级目录可以访问下级目录中种的cookie');
// 	// res.cookie('user', '123', {path: '/aaa', maxAge: 30 * 1000 * 3600 * 24});
// 	res.send('1234');
// });


//  签名
server.use('/aaa', function (req, res) {
	//  签名  原文value还看得见,但可以看得出修改了
	// req.secret = 'jfewia';
	// res.cookie('user', '123', {signed: true, path: '/aaa', maxAge: 30 * 1000 * 3600 * 24});
	//  签过名的cookie
	// console.log(req.signedCookies);
	//  未签名的cookie
	// console.log(req.cookies);
	res.clearCookie('user');
	res.send('1234');
});


