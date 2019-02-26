const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const server = express();
const port = 8848;
server.listen(port);

//  处理文件的中间件
let upload = multer({dest: './source/upload'});

server.use(upload.any());
server.post('/', function (req, res) {
    let file = req.files[0];
    let newName = file.path + path.parse(file.originalname).ext;
    console.log(file.path, path.parse(file.originalname));
    fs.rename(file.path, newName, function (err) {
        if (err) {
            console.log('上传失败');
        } else {
            res.send('上传成功');
        }
    })
});