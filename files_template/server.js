const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const jade = require('jade');
const multer = require('multer');
const consolidate = require('consolidate');

const server = express();
const port = 8848;
server.listen(port);

//1.解析cookie
server.use(cookieParser('miyaomiyao'));

const arr = [];
for(var i=0;i<100000;i++){
    arr.push('sig_'+Math.random());
}
//2.使用session
server.use(cookieSession({
    name: 'aaaaaaa',
    keys: arr,
    maxAge: 20 * 60 * 1000,
}));
//3.post数据
server.use(bodyParser.urlencoded({extended: false,}));
let upload = multer({dest: './source/upload'});
server.use(upload.any());
server.use('/', function (req, res, next) {
    //console.log(req.query,req.body,req.files)
    console.log(req.cookies, req.session);
    next();
});
//  配置模板引擎
//  3.输出什么文件
//  对server进行全局配置
server.set('view engine', 'html');
//  2.模板引擎的位置
server.set('views', './source/views');
//  1.区分模板引擎
server.engine('html', consolidate.ejs);
//  接收请求
server.get('/index', function (req, res, next) {
    if (req.session.userId) {
        res.render('1.ejs', {
            name: 'Jason Terry',
        })
    } else {
        res.render('login.ejs', {})
    }
});


//4.static数据
server.use(expressStatic('./source'));




























