/**
* =======================================================================
* mongodb数据转mysql 模块 
* =======================================================================
*/


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
		    		org_id: docs[i]._id.toString(),
		    		title: docs[i].title,
		    		slug: docs[i].slug,
		    		tags: docs[i].tags.join(","),
		    		keywords: docs[i].keywords,
		    		description: docs[i].description,
		    		status: 1,
		    		clicknum: docs[i].clicknum,
		    		content_html: docs[i].content_html,
		    		content: docs[i].content,
		    		created: docs[i].created
		    	};
		    	models.post.create(post).then(function(result){
		            
		        });
		    }

		  });

		  //db.close();
		});
	},
	comment: function(req, res){
		// Connection URL
		var url = 'mongodb://localhost:27017/rinblogdb';
		// Use connect method to connect to the Server
		MongoClient.connect(url, function(err, db) {
		  // assert.equal(null, err);
		  
		  console.log("Connected correctly to server");

		  var collection = db.collection('comment');
		  // Find some documents
		  collection.find({}).toArray(function(err, docs) {
		    // assert.equal(err, null);
		    // assert.equal(2, docs.length);
		    console.log("Found the following records");
		    //console.dir(docs);
		    for(var i = 0; i < docs.length; i++){
		    	var post = {
		    		post_org_id: docs[i].post_id,
		    		post_slug: docs[i].post_slug,
		    		author: docs[i].author,
		    		email: docs[i].email,
		    		url: docs[i].url,
		    		ip: docs[i].ip,
		    		status: docs[i].status,
		    		avatar: docs[i].avatar,
		    		content: docs[i].content,
		    		created: docs[i].created
		    	};
		    	models.comment.create(post).then(function(result){
		            
		        });
		    }

		  });

		  //db.close();
		});
	}
}