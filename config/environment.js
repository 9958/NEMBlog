var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var settings = require('./settings');
var models = require('../app/models');


module.exports = function(app){
	app.use(express.static(path.join(settings.path, 'public')));
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	//app.use(multer()); // for parsing multipart/form-data
	app.use(function(req, res, next){
		models(function(err, db){
			if(err) return next(err);

			req.models = db.models;
			req.db = db;

			return next();
		});
	});
}