const mysql = require('mysql');

//  1.连接    所有值都得是字符串
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: '20190225',
});

let insertSQL = 'INSERT INTO `user_table` (`ID`,`username`,`password`) VALUES (0,"james","123456")';
let querySQL = 'SELECT * FROM `user_table`;';
db.query(querySQL, function (err, data) {
	if (err) {
		console.log(err)
	} else {
		console.log(data)
	}
});
