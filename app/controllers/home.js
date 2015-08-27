var _       = require('lodash');
var marked = require('marked');
var gravatar = require('gravatar');
var settings = require('../../config/settings');
var akismet = require('akismet').client({blog: settings.akismet_options.blog, apiKey: settings.akismet_options.apikey});
var util = require('../lib/util');
var models  = require('../models');

module.exports = {
	//homepage
	index: function(req, res, next){
		models.post.count().then(function(count){
			var maxPage = parseInt(count / settings.postNum) + (count % settings.postNum ? 1:0);
			var currentPage = isNaN(parseInt(req.params[0])) ? 1 : parseInt(req.params[0]);
			if(currentPage == 0) currentPage = 1;

			var nextPage = currentPage;
			var title = settings.name;

			if(currentPage > 1){
				title +=" > 第" + currentPage + "页";
			}

			var start = (currentPage - 1) * settings.postNum;

			if(maxPage < currentPage){
				return;
			}else if(maxPage > currentPage){
				nextPage = parseInt(currentPage) + 1;
			}

			models.post.findAndCountAll({
				offset: start,
				order:'id desc',
				limit: settings.postNum
			}).then(function(resultArr){
				var result = resultArr.rows;
				for(var i = 0; i<result.length; i++){
					result[i].content = marked(result[i].content);
					if(result[i].content.indexOf('<!--more-->') > 0){
						result[i].content = result[i].content.substring(0, result[i].content.indexOf('<!--more-->')) + '<div class="ReadMore"><a href="/post/' + result[i].id + '">[阅读更多]</a></div>';
					}
				}

				//hot post
				models.post.findAll({
					limit:12,
					order: 'clicknum desc'
				}).then(function(hot_post){
					var index_obj = {
						site_url: settings.site_url,
						name: settings.name,
						title: title,
						keywords: settings.keywords,
						description: settings.description,
						posts: result,
						crtP: currentPage,
						maxP: maxPage,
						nextP: nextPage,
						hotpost: hot_post,
						user: {}
					};

					res.render('theme/' + settings.theme + '/index',index_obj);

				});
				

			});

		});
	},
	post: function(req, res, next){
		var id = req.params.id;
		var idInt = parseInt(id);
		var where = {};
		if(idInt > 0){
			where.id = idInt;
		}else{
			where.slug = id;
		}
		models.post.findOne({
			where:where
		}).then(function(post){
			if(post == null){
				next();
			}

			post.content = marked(post.content);
			//clicknum
			if(post.clicknum !=undefined){
				post.clicknum = post.clicknum + 1;
			}else{
				post.clicknum = 1;
			}
			models.post.update({clicknum: post.clicknum},{where:where});

			var page_title = post.title + ' | ' + settings.name;
			var keywords = settings.keywords;
			if(post.keywords != undefined){
				keywords = post.keywords;
			}

			var description = settings.description;
			if(post.description != undefined){
				description = post.description;
			}

			var commentWhereOr = [];
			commentWhereOr.push({post_id: post.id.toString()});
			if(post.slug){
				commentWhereOr.push({post_slug: post.slug});
			}
			//get all comments
			models.comment.findAll({
				where:{$or:commentWhereOr}
			}).then(function(comments){
				for(var i = 0; i< comments.length; i++){
					if(!comments[i].avatar){
						comments[i].avatar = gravatar.url(comments[i].email, {s: '36', r: 'pg', d: 'mm'}, true);
						console.dir(comments[i].avatar);
						models.comment.update({avatar: comments[i].avatar},{where:{id: comments[i].id}});
					}
				}

				var dataObj = {
					site_url:settings.site_url,
					title: page_title,
					keywords: keywords,
					description: description, 
					post: post,
					comments: comments, 
					name: settings.name,
					user:{},
					re_result:[]
				}
				if(post.tags){
					post.tags = post.tags.split(',');
					var likeStr = "";
					for(var i = 0; i<post.tags.length; i++){
						if(likeStr != ''){
							likeStr += ",";
						}else{
							likeStr += "{tags:{$like:'%" + post.tags[i] +"%'}}";
						}
					}
					likeStr = "[" + likeStr + "]";
					//console.dir(likeStr);
					models.post.findAll({
						where:{
							$or:eval(likeStr)
						},
						limit: 10,
						order: 'clicknum desc'
					}).then(function(re_result){
						dataObj.re_result = re_result;
						res.render('theme/' + settings.theme + '/post', dataObj);
					});
				}else{
					res.render('theme/' + settings.theme + '/post', dataObj);
				}
			});

		});
	},
	archives: function(req, res){
		var sortNumber = function(a, b){
			return a.year < b.year
		};

		models.post.count().then(function(count){
			var pagesize = settings.postNum * 5;
			var maxPage = parseInt(count / pagesize) + (count % pagesize ? 1:0);
			var currentPage = isNaN(parseInt(req.params[0])) ? 1 : parseInt(req.params[0]);
			if(currentPage == 0) currentPage = 1;

			var nextPage = currentPage;
			var title = settings.name;

			if(currentPage > 1){
				title +=" > 第" + currentPage + "页";
			}

			var start = (currentPage - 1) * pagesize;

			if(maxPage < currentPage){
				return;
			}else if(maxPage > currentPage){
				nextPage = parseInt(currentPage) + 1;
			}

			var archiveList = [];
			models.post.findAndCountAll({
				offset: start,
				limit: pagesize,
				order:'id desc'
			}).then(function(archives){
				for(var i = 0; i<archives.length; i++){
					var year = new Date(archives[i].createAt).getFullYear();
					if(archives[i].clicknum === undefined){
						archives[i].clicknum = 0;
					}
					if(archiveList[year] === undefined){
						archiveList[year] = {year: year, archives: []};
					}

					archiveList[year].archives.push(archives[i]);
				}
				archiveList = archiveList.sort(sortNumber);
				var dataObj = {
					site_url:settings.site_url,
					title: settings.name + " › 文章存档", 
					archives: archiveList, 
					name: settings.name,
					keywords: settings.keywords,
					description: settings.description,
					user: {}
				};
				res.render('theme/' + settings.theme + '/archives', dataObj);

			});

		});
	},
	page: function(req, res, next){
		models.page.findOne({
			where: {slug: req.params.slug}
		}).then(function(page){
			page.content = marked(page.content);
			var dataObj = {
				site_url:settings.site_url,
				page: page, name: settings.name,
				keywords: settings.keywords,
				description: settings.description, 
				title: settings.name + ' › ' + page.title
			}
			res.render('theme/' + settings.theme + '/page', dataObj);
		});
	},
	comment: function(req, res, next){
		var id = req.body.id;
		var slug = req.body.slug;
		//hidden input，if value should be dirty robot
  		var no_author = req.body.author;
  		if ((id == "" && slug == "") || !req.headers['referer'] || (req.headers['referer'].indexOf(slug) <= 0 && req.headers['referer'].indexOf(id) <= 0 )) {
	  	  	return res.redirect("/fuck-spam-comment");
	 	} else if (no_author !== "") {
	 	   	//console.log("no_author not is empty");
	   		 return res.redirect("/fuck-spam-comment");
		} else {
			var comment = {
	          post_id: req.body.id,
	          post_slug: req.body.slug,
	          author: req.body.a_uthor,
	          email: req.body.e_mail,
	          url: req.body.u_rl,
	          content: req.body.c_ontent,
	          ip: req.ip,
	          status: "1"//状态： 1：正常，0：SPAM
	        };

	        // 非空检查
	        if (comment.author == "" || comment.email == "" || comment.content == "") {
	          return res.redirect("/post/" + post.slug);
	        }
	        // URL 格式检查
	        var regexp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w\- ./?%&=]*)?/;
	        if (!comment.url.match(regexp)) {
	          comment.url = "http://" + comment.url;
	          if (!comment.url.match(regexp)) {
	            delete comment.url;
	          }
	        }
	        comment.avatar = gravatar.url(comment.email, {s: '36', r: 'pg', d: 'mm'},true);

	        models.comment.create(comment).then(function(result){
	        	//配置了 akismet key 而且不为空时，进行 akismet spam检查
	            if (settings.akismet_options && settings.akismet_options.apikey != "") {
	            	console.dir(comment);
	            	 akismet.checkSpam(comment, function (err, spam) {
	            	 	console.dir(33);
		                //发现SPAM
		                if (spam) {
		                  //console.log('Spam caught.');
		                  models.comment.update({status: 0},{where:{id:result.id}});
		                }
		             });
	            }
	            
	        });

	        res.redirect('/post/' + id);
	 	}

	},
	tag: function(req, res, next){
		models.post.findAll({
			where: {tags:{$like:'%'+req.params.tag+'%'}}
		}).then(function(result){
			for(var i = 0; i < result.length; i++){
				result[i].content = marked(result[i].content)
			}

			var dataObj = {
				site_url:settings.site_url,
				name: settings.name, 
				title: settings.name,
				keywords: settings.keywords,
				description: settings.description, 
				posts: result, 
				tag_name: req.params.tag
			};

			res.render('theme/' + settings.theme + '/tag', dataObj);
		});
	}
}