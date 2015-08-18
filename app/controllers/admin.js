var _       = require('lodash');
var helpers = require('./_helpers');
var settings = require('../../config/settings');
var util = require('../lib/util');
var models  = require('../models');

module.exports = {
  auth_admin: function(req, res, next){
    // if(req.session.admin){
    //   return next();
    // }else{
    //   var cookie = req.cookies[settings.auth_cookie_name];
    //   if(!cookie)
    //     return res.redirect('/admin/login');

    //   var auth_token = util.decrypt(cookie, settings.session_secret);
    //   var auth = auth_token.split('\t');
    //   var admin_name = auth[0];

    //   req.models.admin.find({name:admin_name}, function(err,result){
    //     if(result){
    //       req.session.admin = result;
    //       return next();
    //     }else{
    //       return res.redirect('/admin/login')
    //     }
    //   });
    // }
  },
  index: function(req, res){
    // res.render('admin/index', {layout: false});
  },
  install: function(req, res, next){

    console.dir(models.Admin);
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
            console.dir(params);
            // req.models.admin.create(params, function (err, result) {
            //   if(err) {
            //     if(Array.isArray(err)) {
            //       return res.send(200, { errors: helpers.formatErrors(err) });
            //     } else {
            //       return next(err);
            //     }
            //   }

            //   res.redirect('/admin/install?msg=success');
            // });
          }
      }
    });

  }
  
};
