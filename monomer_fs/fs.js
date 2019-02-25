const fs = require('fs');

//  读文件,文件名,回调函数[异步]
const readFileName = 'aaa.txt';
fs.readFile(readFileName, (err, data) => {
	if (err) {
		console.log(`${readFileName}读取失败`);
	} else {
		console.log(data.toString());
	}
});


const writeFileName = 'bbb.txt';
let writeFileData = '哦是么';
//  写入文件名,内容,回调
fs.writeFile(writeFileName, writeFileData, (err) => {
	console.log(err);
});