const querystring = require('querystring');
module.exports = function () {
	return function (req, res, next) {
		let str = '';
		req.on('data', function (data) {
			str += data
		});
		req.on('end', function () {
			req.body = querystring.parse(str);
			next();
		});
	};
};