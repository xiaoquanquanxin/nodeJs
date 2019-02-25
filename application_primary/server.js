const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

//  暂时模拟数据
const users = {};

const server = http.createServer(function (req, res) {
	//  get
	let obj = urlLib.parse(req.url, true);

	let url = obj.pathname;
	const GET = obj.query;

	let str = '';
	//  post
	req.on('data', function (data) {
		str += data;
	});
	req.on('end', function () {
		const POST = querystring.parse(str);
		// console.log(url, GET, POST);
		//  区分一般接口,文件
		if (url === '/user') {
			switch (GET.act) {
				case 'reg':
					//  检查用户名是否重复
					if (users[GET.user]) {
						res.write('{"ok":false,"msg":"用户已存在"}');
					} else {
						users[GET.user] = GET.pass;
						res.write('{"ok":true,"msg":"注册成功"}');
					}
					break;
				case 'login':
					//  检查用户是否存在
					//  验证密码
					if (!users[GET.user]) {
						res.write('{"ok":false,"msg":"查无此人"}');
					} else if (users[GET.user] !== GET.pass) {
						res.write('{"ok":false,"msg":"密码不对"}');
					} else {
						res.write('{"ok":true,"msg":"登录成功"}');
					}
					break;
				default :
					res.write('{"ok":false,"msg":"未知的act"}');
			}
			res.end();
		} else {
			let file_name = './source' + url;
			console.log(file_name);
			fs.readFile(file_name, function (err, data) {
				if (err) {
					res.write('404')
				} else {
					res.write(data)
				}
				res.end()
			});
		}
	});
	//  文件
});
const port = 8848;
//  监听  参数是端口
server.listen(port);