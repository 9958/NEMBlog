var path = require('path');
var express = require('express');
var colors = require('colors')
//var debug = require('debug')('NEMBlog');
var settings = require('./config/settings');
var environment = require('./config/environment');
var routes = require('./config/routes');
var models = require('./app/models');

var app = express();

environment(app);
routes(app);

models.sequelize.sync().then(function(){
	var server = app.listen(app.get('port'),function(){
		console.log('listening on port ' + server.address().port);
	});
});

