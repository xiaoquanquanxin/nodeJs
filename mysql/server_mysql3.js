const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');
const mysql = require('mysql');


const timeFormat = require('./time_format');

//连接池
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'blog'
});

let server = express();
server.listen(8848);

//1.解析cookie
server.use(cookieParser('sdfasl43kjoifguokn4lkhoifo4k3'));

//2.使用session
let arr = [];
for (let i = 0; i < 100000; i++) {
    arr.push('keys_' + Math.random());
}
server.use(cookieSession({name: 'zns_sess_id', keys: arr, maxAge: 20 * 3600 * 1000}));

//3.post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './www/upload'}).any());

//4.配置模板引擎
//输出什么东西
server.set('view engine', 'html');
//模板文件放在哪儿
server.set('views', './template');
//哪种模板引擎
server.engine('html', consolidate.ejs);

//接收用户请求
server.get('/index', (req, res, next) => {
    //查询banner的东西
    db.query("SELECT * FROM banner_table", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('database error').end();
        } else {
            res.banners = data;
            next();
        }
    });
});
server.get('/index', (req, res, next) => {
    //查询banner的东西
    db.query("SELECT `title`,`summary`,`ID` FROM article_table", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('database error').end();
        } else {
            res.article = data;
            next();
        }
    });
});
server.get('/index', (req, res)=> {
    db.query("SELECT * FROM user_table", (err, data)=> {
        if (err) {
            console.log(err)
        } else {
            console.log(data);
            res.render('index.ejs', {banners: res.banners, article: res.article});
        }
    })
});
server.get('/article', (req, res, next)=> {
    if (req.query.id) {
        next();
    } else {
        res.send('无内容');
    }
});
server.get('/article', (req, res)=> {
    db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('database article_table error');
        } else {
            let articleData = data[0];
            if (articleData) {
                let time = timeFormat.time2date(articleData.post_time);
                articleData.post_time = `${time.year}-${time.month}-${time.date} ${time.hour}:${time.minutes}:${time.second}`;
                articleData.content = articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
                console.log(articleData.n_like)
                res.render('conText.ejs', {
                    articleData: articleData,
                })
            } else {
                res.send('无内容');
            }
        }
    });
});


//4.static数据
server.use(expressStatic('./www'));



