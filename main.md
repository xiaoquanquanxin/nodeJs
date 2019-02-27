
nodeJs支持es6语法
http模块是nodeJs自带模块

fs模块
fs.readFile     是异步操作
fs.writeFile

/-------------------
对于请求:
前端:
请求,无论类型,都走的是http请求
header
content

后台区分:
请求方式不同:get,post
get         data在url里
相关解析模块:
querystring 用于解析?字符串
url 解析整个, url.parse(url,true)
post        data在content里,数据可以大得多
数据传送分析:分块发送,相当于异步.容错性好.
数据解析:分段接收.



/---------------------
模块化
系统模块    fs  url querystring http
自定义模块
模块管理    包管理器

自带模块
Assertion Testing           断言
Buffer                      原始二进制数据
C/C++ Addons - N-API        把c语言的东西导入到node中
Child Process               子进程
Cluster                     进程
Crypto                      加密  md5 sha256
DNS                         域名解析    www.baidu的pi是多少
Events                      事件
File System                 fs
Http/Https
Net                         发送文件
Os                          操作系统相关
Path                        处理文件应用
Stream                      流操作 提升磁盘使用率,高效,容错率高
SSL                         加密
ZLIB                        压缩



自定义模块

1.模块的组成
require:
引入模块,包括系统模块和自定义模块
可以去掉后缀,因为一定是js文件
引入自定义模块需要'./',除非放到node_modules里面
require引入规则:如果有./就找./,否则从node_modules里面找.系统默认模块的优先级高于自定义模块.


module:
模块,用于批量输出

exports:    导出
nodeJs中没有全局变量,它会在最外面默认套一层匿名函数,可以防止命名冲突,需要exports导出

2.npm
NodeJs Package Manager
统一下载途径,自动下载依赖,

3.发包
在这个包的文件夹下
先注册npm账号
npm publish
修改package.json后
npm publish
npm unpublish --force   这样只删一个包,删包只能在发布后一个小时以内


/-------------------------
express框架
中间件/插件
读取静态文件:express-static
解析post请求:body-parser 过渡使用,将来不用



/--------------------------
http请求是无状态的,无法识别是否是同一个人.
cookie:在浏览器中保存一些数据,并且每次向浏览器发送请求的时候都带过来.
缺点:不安全,有限,4k.

session:保存在服务端的数据,安全性和数据库是一个级别.
session是基于cookie实现的.
cookie中有个sessionID,使服务器找到session文件.

隐患:session劫持.解法:理论上无解.缓解:cookie加密,更换sessionID.

总结:
cookie:
1.空间有限
2.安全性差

1.精打细算,子cookie
2.需要校验cookie是否被篡改
3.秘钥能够定期更换

1.发送cookie
res.secret=签名
res.cookie(name,value,{maxValue,path,signed,})
2.读取cookie
require cookie-parser
server.use(cookie-parser(签名));
req.signedCookies 签名了的cookies
req.cookies 未签名的cookies
3.删除cookie
只能删当前use路径下的cookie
res.clearCookie(name)


session:
1.存在服务器,安全
2.不能独立存在,基于cookie
3.关闭浏览器session就会消失
4.在浏览器中会创建两条cookie,一个是session,一个是session的签名,任何修改都会重置这个session.

cookie-session
server.use(cookieparser())
server.use(cookiesession({
    keys:[],
    maxAge,
    name
}))
delete req.session




/--------------------------
模板引擎
主流:
jade--
侵入式,与普通的html,css不能共存
强依赖
ejs--
非侵入式,不破原本的html,css
若依赖,温和

jade:
1.根据缩进,规定层级
2.属性放在括号里,逗号分隔多个属性
script(src=xxx);
3.内容,空一格,直接往后写
4.style属性有两种写法,第一种普通写法,第二种是传递json对象 li(style={'color':'green'})
5.class属性类似,li(class=['aaa','bbb'])
6.属性的统一简写
其他特点
1.自动识别单标签和双标签,在input下包div,会报错
2.可以自定义标签,都是双标签
3.'|',原样输出
4.'.',代表下面的内容原样输出       [不好用]
5.include,引入文件,会写入模板
6.变量 #{name},从renderFile中传入实参 {name:'权鑫'}
7.style和class的值是变量,特殊,值不需要#{name},直接div(style=style)
8.'-'代表jade内执行的程序,有一个'-',后面的就不用加了,但是最好加上

x.防止注入式攻击,可以把标签干成&lt;


ejs
1.'='转义输出,'-'原样输出
2.include,引入文件,会自动判断引入的文件的地址对不对
3.include关键字后面的内容,不会判断是变量还是什么,永远都识别为路径


/-------------------
路由
是express的一部分,相当于一个迷你版的server
他也可以像server那样,get,post,use

作用:把大服务拆小了

过程:
1.创建router
2.把router添加到server
3.router内部进行功能

/---------------------------------
数据基本单位
1.库 / 文件夹
2.表 / 文件,数据

主键:每个数据的唯一标识符,唯一/性能最高

nodeJs本身不支持MySQL,需要require


/-------------------------------------------------
数据库
数据库分为:
客户端
服务端

node的mysql模块是客户端
node过程:
1.链接服务器
2.查询

SQL语句
SQL:Structured Query Language,构化查询语言
关键字大写以示区分
库名,表名,字段都加上``
四大查询语句:增删改查 insert,delete,update,select
增:  INSERT INTO 表 VALUES
INSERT INTO 表 (字段列表) VALUES(值列表)
INSERT INTO `user_table` (`ID`,`username`,`password`) VALUES(0,'blue','aaa')

删   DELETE xx FROM 表 WHERE
改:  UPDATE 表 SET key=value,key=value WHERE
查:  SELECT xx FROM 表
SELECT * FROM `user_table`

子语句
条件
WHERE a='x' AND b>'x' OR c<='c'
排序
ORDER BY xx ASC/DESC 升序/降序
    exp:按a升序,再按b降序
ORDER BY a ASC, b DESC
合并同类,以xx为依据
COUNT
SELECT * FROM 表 GROUP BY 条件




/----------------------
数据字典:定义数据,字段

数据字典——数据定出来

1.banner(banner_table)
	ID
	title		标题		varchar(32)
	sub_title	副标题		varchar(16)
	src		图片地址	varchar(64)

2.文章(article_table)
	ID
	author		作者		varchar(16)
	author_src	作者头像	varchar(64)
	title		标题		varchar(32)
	post_time	发布时间(s)	int
	content		内容		text        更大的字符串，可以到2-4G
	n_like		赞		int

3.用户(user_table)
	ID
	username	用户名		varchar(32)
	password	密码		varchar(32)
	src		头像		varchar(64)


连接池
问题:每次请求,都要进行连接数据库,消耗性能
解:保持多个连接--连接池
mysql.createPool({})