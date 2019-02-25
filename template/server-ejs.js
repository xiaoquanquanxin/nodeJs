const ejs = require('ejs');
const fs = require('fs');
ejs.renderFile('./views/1.ejs', {
	name: '权鑫',
	type: 'admin',
	arr: ['aaa', 'www']
}, function (err, data) {
	if (err) {
		console.log('编译失败');
	} else {
		console.log(data);
		fs.writeFile('./build/ejs.html', data, function (err) {
			if (err) {
				console.log('写入文件失败')
			} else {
				console.log('写入文件成功')
			}
		});

	}
});

