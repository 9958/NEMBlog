var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var partials = require('express-partials');
var compression = require('compression')
var settings = require('./settings');


module.exports = function(app){
	app.set('port', settings.port);
	//template engine
	app.engine('.html', require('ejs').__express);
	app.set('views',path.join(settings.path, 'app/views'));
	app.set('view engine', 'html');
	app.use(compression())
	app.use(partials());
	
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	// app.use(multer()); // for parsing multipart/form-data
	
	//session
	app.use(session({
	  resave: false, // don't save session if unmodified
	  saveUninitialized: false, // don't create session until something stored
	  secret: 'keyboard cat'
	}));
	app.use(cookieParser('my secret here'));
	
	//static dir
	var theme_static_dir = path.join(settings.path, 'app/views/theme/' + settings.theme + '/assets');
	var admin_static_dir = path.join(settings.path, 'app/views/admin/assets');
	app.use("/admin/assets", express.static(admin_static_dir));
  	app.use("/theme/assets", express.static(theme_static_dir));
  	app.use(express.static(path.join(settings.path, 'public')));

}