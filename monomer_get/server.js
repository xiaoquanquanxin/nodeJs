const http = require('http');
const querystring = require('querystring');
const urlLit = require('url');
const server = http.createServer(function (req, res) {
	const url = req.url;
	let GET = null;
	if (url.indexOf('?') !== -1) {
		// GET = querystring.parse(url);
		GET = urlLit.parse(url, true);
		let pathname = GET.pathname;
		let query = GET.query;
		console.log(pathname, query);
		console.log(GET);
	}
	res.write('success');
	res.end();
});
const port = 8848;
server.listen(port);