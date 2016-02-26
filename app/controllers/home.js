var _       = require('lodash');
var marked = require('marked');
var gravatar = require('gravatar');
var moment = require('moment');
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
					var time = result[i].created || result[i].createdAt;
					result[i].addtime = moment(new Date(time)).format("YYYY-MM-DD");
					if(result[i].content.indexOf('<!--more-->') > 0){
						result[i].content = result[i].content.substring(0, result[i].content.indexOf('<!--more-->')) + '<div class="ReadMore"><a href="/post/' + result[i].id + '">[阅读更多]</a></div>';
					}
				}

				//hot post
				models.post.findAll({
					limit:12,
					order: 'clicknum desc'
				}).then(function(hot_post){

					models.comment.findAll({
						limit:10,
						order: 'id desc'
					}).then(function(comments){
						for(var i = 0; i < comments.length; i++){
							var time = comments[i].created || comments[i].createdAt;
							comments[i].addtime = moment(new Date(time)).format("YYYY-MM-DD");
							comments[i].gourl = comments[i].post_slug || comments[i].post_id ;
						}

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
							comments: comments,
							user: {}
						};

						res.render('theme/' + settings.theme + '/index',index_obj);
					});

					

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

			var time = post.created || post.createdAt;
			post.addtime = moment(new Date(time)).format("YYYY-MM-DD");
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
			//get new post
			models.sequelize.query('select title,created,createdAt,clicknum,slug from posts order by id desc limit 10',{
		      	type: models.sequelize.QueryTypes.SELECT
		    }).then(function(newposts){
				var dataObj = {
					site_url:settings.site_url,
					title: page_title,
					keywords: keywords,
					description: description, 
					post: post,
					newposts: newposts, 
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

		var keyword = req.query.keyword;
		var searchWhere = {};
		if(keyword && keyword != ''){
			var OrWhere = [];
			OrWhere.push({title:{$like: '%'+keyword+'%'}});
			OrWhere.push({tags:{$like: '%'+keyword+'%'}});
			searchWhere = {$or: OrWhere};
		}

		models.post.count({where:searchWhere}).then(function(count){
			
			var pagesize =req.query.size || (settings.postNum * 5);
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
				where:searchWhere,
				offset: start,
				limit: pagesize,
				order:'id desc'
			}).then(function(resultArr){
				var archives = resultArr.rows;
				for(var i = 0; i<archives.length; i++){

					var time = archives[i].created || archives[i].createdAt;
					var year = new Date(time).getFullYear();
					if(archives[i].clicknum === undefined){
						archives[i].clicknum = 0;
					}
					if(archiveList[year] === undefined){
						archiveList[year] = {year: year, archives: []};
					}
					archives[i].addtime = moment(new Date(time)).format("YYYY-MM-DD");

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
					crtP: currentPage,
					maxP: maxPage,
					nextP: nextPage,
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
				result[i].content = '';
				var time = result[i].created || result[i].createdAt;
				result[i].addtime = moment(new Date(time)).format("YYYY-MM-DD");
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
	},
	nav: function(req, res, next){
		models.nav_cat.findAll({
			where: {status:1}
		}).then(function(cat_list){
			var catList = cat_list;
			models.nav_list.findAll({
				where: {status:1}
			}).then(function(list){
				//将列表挂在分类下
				var cat_list = mergeCatList(catList,list);
				//处理分类层级关系
				var cat_list = getTree(cat_list,0);
				var dataObj = {
					site_url:settings.site_url,
					name: settings.name, 
					title: settings.name,
					keywords: settings.keywords,
					description: settings.description, 
					cat_list: cat_list,
					layout: false
				};
				res.render('theme/' + settings.theme + '/nav', dataObj);
			})
		});
	},
	siteMapBaidu: function(req, res){
		var sortNumber = function (a, b) {
	        return a.year < b.year
	      };
	      
	      models.sequelize.query('select title,created,createdAt,clicknum,slug from posts',{
	      	type: models.sequelize.QueryTypes.SELECT
	      }).then(function(archives){
	      	var archiveList = [];

	      	for(var i = 0; i<archives.length; i++){
				var time = archives[i].created || archives[i].createdAt;
				var year = new Date(time).getFullYear();
				if(archives[i].clicknum === undefined){
					archives[i].clicknum = 0;
				}
				if(archiveList[year] === undefined){
					archiveList[year] = {year: year, archives: []};
				}
				archives[i].addtime = moment(new Date(time)).format("YYYY-MM-DD");

				archiveList[year].archives.push(archives[i]);
			}
	        //archiveList = archiveList.sort(sortNumber);
	 
	        var now_date = new Date();
	        var dataObj = {
	        	site_url:settings.site_url,
	        	title: settings.name + " › 站点地图", 
	        	layout: false,
	        	archives: archiveList, 
	        	name: settings.name,
	        	keywords: settings.keywords,
	        	description: settings.description,
	        	now_date:now_date
	        }
	        res.render('theme/' + settings.theme + '/sitemap_baidu.html', dataObj);
	      });
	},
	siteMapGoogle: function(req, res){
		var sortNumber = function (a, b) {
	        return a.year < b.year
	      };
	      
	      models.sequelize.query('select title,created,createdAt,clicknum,slug from posts',{
	      	type: models.sequelize.QueryTypes.SELECT
	      }).then(function(archives){
	      	var archiveList = [];
	      	for(var i = 0; i<archives.length; i++){
				var time = archives[i].created || archives[i].createdAt;
				var year = new Date(time).getFullYear();
				if(archives[i].clicknum === undefined){
					archives[i].clicknum = 0;
				}
				if(archiveList[year] === undefined){
					archiveList[year] = {year: year, archives: []};
				}
				archives[i].addtime = moment(new Date(time)).format("YYYY-MM-DD");

				archiveList[year].archives.push(archives[i]);
			}
	        //archiveList = archiveList.sort(sortNumber);
	 
	        var now_date = new Date();
	        var dataObj = {
	        	site_url:settings.site_url,
	        	title: settings.name + " › 站点地图", 
	        	layout: false,
	        	archives: archiveList, 
	        	name: settings.name,
	        	keywords: settings.keywords,
	        	description: settings.description,
	        	now_date:now_date
	        }
	        res.setHeader('content-type', 'application/xml');
	        res.render('theme/' + settings.theme + '/sitemap_google.html', dataObj);
	      });
	}
}


function getTree(data,pid){
	var tree = [];
	for(var i=0;i<data.length;i++){	
		if(data[i].parentid == pid){
			data[i].child = getTree(data,data[i].id);
			tree.push(data[i]);
		}
	}
	return tree;
}

function mergeCatList(cat_list,nav_list){
	var navTemp = [];
	var navCatTmp = [];
	for(var i=0;i<nav_list.length;i++){	
		if(navTemp[nav_list[i].cat_id]){
			navTemp[nav_list[i].cat_id].push(nav_list[i]);
		}else{
			//navCatTmp.push(nav_list[i].cat_id);
			navTemp[nav_list[i].cat_id] = [];
			navTemp[nav_list[i].cat_id].push(nav_list[i]);
		}
	}

	for(var i=0;i<cat_list.length;i++){	
		if(navTemp[cat_list[i].id]){
			cat_list[i].list = navTemp[cat_list[i].id];
		}
	}
	return cat_list;
}
