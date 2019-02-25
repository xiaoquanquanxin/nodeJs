const express = require('express');
const cookieSession = require('cookie-session');

const server = express();
const port = 8848;
server.listen(port);

//  session是基于cookie的,得先解析cookie
const cookieParser = require('cookie-parser');
server.use(cookieParser());

//  需要秘钥
server.use(cookieSession({
	name: 'awsl',
	maxAge: 24 * 3600 * 1000,
	keys: ['aaa', 'bbb', 'ccc']
}));

//  签名
server.use('/aaa', function (req, res) {
	if (!Number(req.session['count'])) {
		req.session['count'] = 0;
	}
	req.session['count']++;
	console.log(req.session);
	console.log(req.cookies);
	res.send('1234');
});