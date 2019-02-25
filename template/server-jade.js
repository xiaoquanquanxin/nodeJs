const jade = require('jade');
const fs = require('fs');
// let str = jade.render(
// 	'html\n' +
// 	'\thead\n' +
// 	'\t\tstyle\n' +
// 	'\tbody\n' +
// 	'\t\tdiv\n' +
// 	'\t\tdiv');
// console.log(str);

//              渲染文件 .jade              美化选项
let str = jade.renderFile('./views/1.jade', {
	pretty: true, name: '权鑫',
	style: {width: '100px', color: 'red'},
	arr: ['aaa', 'bbb', 'ccc'],
	content: '<h3>啊啊啊啊</h3>',
	switch_case: 1

});
console.log(str);
fs.writeFile('./build/jade.html', str, function (err) {
	if (err) {
		console.log('写入文件失败');
	} else {
		console.log('写入文件成功');
	}
});


