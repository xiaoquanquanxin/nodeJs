const mysql = require('mysql');

//  1.连接    所有值都得是字符串//  链接服务器
//  数据库对象                   用户名,密码,哪个库
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: '20190225',
});

let insertSQL = 'INSERT INTO `user_table` (`ID`,`username`,`password`) VALUES (0,"james","123456")';
let querySQL = 'SELECT * FROM `user_table`;';
//  查询  查什么,回调函数
db.query(querySQL, function (err, data) {
	if (err) {
		console.log(err)
	} else {
		console.log(data)
	}
});