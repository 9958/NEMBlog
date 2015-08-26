var _       = require('lodash');
var marked = require('marked');
var settings = require('../../config/settings');
var util = require('../lib/util');
var models  = require('../models');

var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');

module.exports = {
	post: function(req, res){


		// Connection URL
		var url = 'mongodb://localhost:27017/rinblogdb';
		// Use connect method to connect to the Server
		MongoClient.connect(url, function(err, db) {
		  // assert.equal(null, err);
		  
		  console.log("Connected correctly to server");

		  var collection = db.collection('post');
		  // Find some documents
		  collection.find({}).toArray(function(err, docs) {
		    // assert.equal(err, null);
		    // assert.equal(2, docs.length);
		    console.log("Found the following records");
		    //console.dir(docs);
		    for(var i = 0; i < docs.length; i++){
		    	var post = {

		    	};
		    	models.post.create(post).then(function(result){
		            
		        });
		    }

		  });

		  //db.close();
		});
	}
}