var _       = require('lodash');
var marked = require('marked');
var settings = require('../../config/settings');
var util = require('../lib/util');
var models  = require('../models');


module.exports = {
  
  /**
   * =======================================================================
   * post 模块 
   * =======================================================================
   */
  postIndex: function(req, res){
    models.post.findAll().then(function(results){
        res.render('admin/post_index', {layout: false, post_list: results});
    });
  },
  postWrite: function(req, res){
    if(req.method == "GET"){
        res.render('admin/post_add', {layout: false});
    }else if(req.method == "POST"){
        var post = _.pick(req.body, 'title', 'slug','content','keywords','description','tags','status');
        post.content_html = marked(post.content);

        //post.status = 1;
        models.post.create(post).then(function(result){
          res.send({success:1,id:result.id});
            // res.redirect('/admin/post/edit/' + result.id);
        });
    }
  },
  postEdit: function(req, res){
    if(req.method == "GET"){
        var id = req.params.id;
        models.post.findById(id).then(function(result){
            res.render('admin/post_update', {layout: false, post: result});
        }).catch(function(error) {
            res.redirect('/admin/post');
        });
    }else if(req.method == "POST"){
        var post = _.pick(req.body, 'title', 'slug','content','keywords','description','tags','status');
        post.content_html = marked(post.content);
        //console.log(req.body.id);
        models.post.update(post,{where:{id: req.body.id}}).then(function(){
          res.send({success:1});
            //res.redirect('/admin/post/edit/' + req.body.id);
        });
    }
  },
  postDelete: function(req, res){
    if(req.method == "GET"){
        var id = req.params.id;
        models.post.destroy({where:{id: id}}).then(function(){
            res.redirect('/admin/post');
        }).catch(function(error) {
            res.redirect('/admin/post');
        });
    }
  },
  /**
   *============================================================================
   * page 模块
   *============================================================================
   */
  pageIndex: function(req, res){
    models.page.findAll().then(function(results){
        res.render('admin/page_index', {layout: false, page_list: results});
    });
  },
  pageWrite: function(req, res){
    if(req.method == "GET"){
      res.render('admin/page_write', {layout: false});
    }else if(req.method == "POST"){
      var page = _.pick(req.body, 'title', 'slug','content','keywords','description');
      page.content_html = marked(page.content);
      page.status = 1;
      models.page.create(page).then(function(result){
          res.redirect('/admin/page/edit/' + result.id);
      });
    }
  },
  pageEdit: function(req, res){
    if(req.method == "GET"){
      var id = req.params.id;
      models.page.findById(id).then(function(result){
          res.render('admin/page_edit', {layout: false, page: result});
      }).catch(function(error) {
          res.redirect('/admin/page');
      });
    }else if(req.method == "POST"){
      var page = _.pick(req.body, 'title', 'slug','content','keywords','description');
      page.content_html = marked(page.content);
      page.status = 1;
      models.page.update(page,{where:{id: req.body.id}}).then(function(){
          res.redirect('/admin/page/edit/' + req.body.id);
      });
    }

    
  },
  /**
   *============================================================================
   * 导航 模块
   *============================================================================
   */
  navCat: function(req, res){
    models.nav_cat.findAll().then(function(results){
        res.render('admin/nav_cat', {layout: false, cat_list: results});
    });
  },
  navCatSave: function(req, res){
    if(req.method == "POST"){
      var nav_cat = _.pick(req.body, 'name','parentid');
      nav_cat.status = 1;
      if(req.body.id>0){
        models.nav_cat.update(nav_cat,{where:{id: req.body.id}}).then(function(){
            var data = {
              success:true
            }
            res.send(data);
        });
      }else{
        models.nav_cat.create(nav_cat).then(function(result){
            var data = {
              success:true,
              result:result
            }
            res.send(data);
        });
      }
      
    }
  },
  navList: function(req, res){
    models.nav_list.findAll().then(function(results){
        res.render('admin/nav_list', {layout: false, nav_list: results});
    });
  },
  navListSave: function(req, res){
    if(req.method == "POST"){
      var nav_list = _.pick(req.body, 'title','url','content','cat_id');
      nav_list.status = 1;
      if(req.body.id>0){
        models.nav_list.update(nav_list,{where:{id: req.body.id}}).then(function(){
            var data = {
              success:true
            }
            res.send(data);
        });
      }else{
        models.nav_list.create(nav_list).then(function(result){
            var data = {
              success:true,
              result:result
            }
            res.send(data);
        });
      }
      
    }
  },
   /**
   *============================================================================
   * 导航 模块
   *============================================================================
   */
  tag: function(req, res){
    models.tag.findAll({order:'count desc'}).then(function(results){
        models.tag_log.findOne({order:'id desc'}).then(function(tagRes){
            //纪录一次
            res.render('admin/tag', {layout: false, tag_list: results,tag_log:tagRes});
        });
        
    });
  },
  tagSave: function(req, res){
    if(req.method == "POST"){
      var tag = _.pick(req.body, 'title','count');
      tag.status = 1;
      if(req.body.id>0){
        models.tag.update(tag,{where:{id: req.body.id}}).then(function(){
            var data = {
              success:true
            }
            res.send(data);
        });
      }else{
        models.tag.create(tag).then(function(result){
            var data = {
              success:true,
              result:result
            }
            res.send(data);
        });
      }
      
    }
  },
  tagQuery: function(req, res){
    if(req.method == "POST"){
      models.tag_log.findOne({
        order:'id desc'
      }).then(function(result){
          var last_post_id = 0;
          if(result){
            last_post_id = result.last_post_id;
          }else{
            last_post_id = 0;
          }
         models.sequelize.query('select id,tags from posts where id >'+last_post_id+' order by id asc limit 1',{
            type: models.sequelize.QueryTypes.SELECT
          }).then(function(results){
            results.forEach(function(item,index){
              var lastPostId = item.id;
      
              //纪录最大的id
              if(index==0){
                models.tag_log.create({last_post_id:lastPostId}).then(function(res){
                    //纪录一次
                });
              }
              //纪录标签
              var tagsStr = item.tags;
              var tagsArr = tagsStr.split(',');
       
              tagsArr.forEach(function(tagsItem){
                (function(e) {
                    models.tag.findOne({
                      where:{
                        title:e
                      }
                    }).then(function(tagRes){
                        var titleTmp = e;
                        if(tagRes){
                          models.tag.update({count:tagRes.count+1},{where:{id: tagRes.id}}).then(function(){
                              //更新纪录
                          });
                        }else{
                          models.tag.create({title:titleTmp,status:1,count:1}).then(function(res){
                              //生成纪录
                          });
                        }
                    });
                })(tagsItem);
              });
        
            
            });
            //返回成功
            var data = {
              success:true,
              result:results[0]
            }
            res.send(data);
            
          });


        });
      
    }
  },
  /*
  *===============================================================================
  * 评论 模块
  *===============================================================================
   */
  commentIndex: function(req, res){
    var limit = 100;
    var status = req.query['status'];
    if(!status) status = 1;

    models.comment.findAndCountAll({
      where: {status:status},
      offset: 0,
      limit: limit
    }).then(function(result){
      console.dir(result.count);
      console.dir(result.rows);
      res.render('admin/comment_index', {layout: false, comment_list: result.rows, status: status});
    });
  },
  commentDelete: function(req, res){
    if(req.method == "GET"){
        var id = req.params.id;
        models.comment.destroy({where:{id: id}}).then(function(){
            res.redirect('/admin/comment');
        }).catch(function(error) {
            res.redirect('/admin/comment');
        });
    }
  },
  

  /*
  *===============================================================================
  * 登录 模块
  *===============================================================================
   */
  login: function(req, res){
    if(req.method == "GET"){
        res.render('admin/login', {layout: false});
    }else if(req.method == "POST"){
        var name = req.body.name.trim();
        var pass = req.body.pass.trim();
        if(name == '' || pass == ''){
            res.render('admin/login', {layout: false,error: '账号或密码为空！'});
            return;
        }

        //check username and password
        models.admin.findOne({where:{name:name}}).then(function(result){
            if(result){
              pass = util.md5(pass);
              if(result.password !=pass){
                //to be safe,show username or password error
                res.render('admin/login',{layout: false,error: '账号或密码错误！'});
                return;
              }
              //store session cookie
              _do_session(result, res);
              res.redirect('/admin');
            }else{
              return res.redirect('/admin/login')
            }
        });
    }
  },
  logout: function(req, res, next){
    req.session.destroy();
    res.clearCookie(settings.auth_cookie_name,{path: '/'});
    res.redirect('/');
  },
  index: function(req, res){
    res.render('admin/index', {layout: false});
  },
  //验证
  auth_admin: function(req, res, next){
    if(req.session.admin){
      return next();
    }else{
      var cookie = req.cookies[settings.auth_cookie_name];
      if(!cookie)
        return res.redirect('/admin/login');

      var auth_token = util.decrypt(cookie, settings.session_secret);
      var auth = auth_token.split('\t');
      var admin_name = auth[0];

      models.admin.findOne({where:{name:admin_name}}).then(function(result){
        if(result){
          req.session.admin = result;
          return next();
        }else{
          return res.redirect('/admin/login')
        }
      });
    }
  },
  /**
   * ==============================================================================
   * 初始化 模块
   * ==============================================================================
   */
  install: function(req, res, next){

    models.admin.count().then(function(c) {
      if(c > 0){
        /*已经初始化*/
        if(req.query['msg'] == "success")
          res.render('admin/install', {layout:false, msg: 'success'});
        else
          res.render('admin/install', {layout:false, msg: true});
      }else{
        if(req.method == "GET"){
            res.render('admin/install', {layout: false});
          }else if(req.method == "POST"){
            //将用户输入的账号密码插入到admin表中
            var params = _.pick(req.body, 'name', 'password');
            params.password = util.md5(params.password);
            //console.dir(params);
            models.admin.create(params).then(function(){
                res.redirect('/admin/install?msg=success');
            });
          }
      }
    });

  }
  
};


/**
 * private function
 */
function _do_session(admin, res){
    var auth_token = util.encrypt(admin.name + '\t' + admin.password, settings.session_secret);
    res.cookie(settings.auth_cookie_name, auth_token, {path: '/',maxAge: 1000*60*60*24*7});
}