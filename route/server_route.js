const express = require('express');
//const express = require('express');
const server = express();
const port = 8848;
server.listen(port);

//  index 1 /user
//  index 2 /article

//  index 1
const routeUser = express.Router();
routeUser.get('/1.html', function (req, res) {
    res.send('user.1.html');
});
routeUser.get('/2.html', function (req, res) {
    res.send('user.2.html');
});
//  把创建好的路由加到express里
server.use('/user', routeUser);

//  index 2
const articleRouter = express.Router();
server.use('/article', articleRouter);

articleRouter.get('/1.html', function (req, res, next) {
    res.send('article.1.html');
});

server.get('*', function (req, res) {
    res.send('404');
});