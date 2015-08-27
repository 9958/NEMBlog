var path = require('path');

var settings = {
	//base config
	path: path.normalize(path.join(__dirname,'..')),
	port: process.env.NODE_PORT || 3000,
	database: process.env.DATABASE || "mysql://root:@localhost:3306/nemblog",
	theme: process.env.THEME || 'default',//主题名称

	//application config
	postNum: process.env.POST_NUM || '10',//每页显示文章个数
	auth_cookie_name: process.env.AUTH_COOKIE_NAME || 'nd_secret',//cookie 名字
	session_secret: process.env.SESSION_SECRET || 'a743894a0e',//session加密串
	cookie_secret: process.env.COOKIE_SECRET || 'a743894a0e',//session加密串
	name: process.env.NAME || 'rin部落',
	version: process.env.VERSION || '1.0.0',
	site_url: process.env.SITE_URL || 'http://localhost:3000',
	keywords: process.env.KEYWORDS || 'php 技术 入门 基础 教程|node.js入门|nodejs入门|ecshop 商城|web|nodejs|nginx|MySQL|Linux|appfog|mongodb|js|javascript|jquery|div|css|网页|设计|布局',
	description: process.env.DESCRIPTION || 'rin部落一个以web应用为中心,面向网络上所有作为Web开发的读者及程序爱好者的技术博客;博客主要以学习并钻研技术,分享nodejs,nginx,MySQL,Linux,appfog,mongodb,js,javascript,jquery,div,css,网页,设计,布局等相关技术领域的知识与技术，期待与志同道合的朋友共同进步.',
	
	smtp :{
        use_authentication: true, //如果我们使用QQ等邮箱，这个必须写且为true
        host: 'smtp.163.com',   //定义用来发送邮件的邮箱服务器，一般是QQ这些的
        port:25,    //定义服务器端口，一般是25   ,如果是使用SSL端口一般为465,或者587
        ssl:false,     //默认不适用SSL，可以省略不写
        user: 'rin9958@163.com',   //邮箱用户名
        pass:'a123456'   //输入邮箱密码
	},

	akismet_options: {
	  apikey: 'myakismetapikey123', // akismet api key，不启用 akismet 请设置为空
	  blog: 'http://localhost:3000' // required: your root level url
	}
}

module.exports = settings;