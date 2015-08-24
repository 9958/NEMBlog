var controllers = require('../app/controllers');

module.exports = function(app){
	app.get('/', controllers.home);

	/*admin*/
	app.get('/admin', controllers.admin.auth_admin, controllers.admin.index);
	app.get('/admin/install', controllers.admin.install);
	app.post('/admin/install', controllers.admin.install);

	app.get('/admin/login', controllers.admin.login);
	app.post('/admin/login', controllers.admin.login);
	app.get('/admin/logout', controllers.admin.auth_admin, controllers.admin.logout);

	app.get('/admin/post', controllers.admin.auth_admin, controllers.admin.postIndex);
  	app.get('/admin/post/write', controllers.admin.auth_admin, controllers.admin.postWrite);
  	app.post('/admin/post/write', controllers.admin.auth_admin, controllers.admin.postWrite);
  	app.get('/admin/post/edit/:id', controllers.admin.auth_admin, controllers.admin.postEdit);
  	app.post('/admin/post/edit/:id', controllers.admin.auth_admin, controllers.admin.postEdit);
  	app.get('/admin/post/delete/:id', controllers.admin.auth_admin, controllers.admin.postDelete);

  	app.get('/admin/page', controllers.admin.auth_admin, controllers.admin.pageIndex);
  	app.get('/admin/page/write', controllers.admin.auth_admin, controllers.admin.pageWrite);
  	app.post('/admin/page/write', controllers.admin.auth_admin, controllers.admin.pageWrite);
  	app.get('/admin/page/edit/:id', controllers.admin.auth_admin, controllers.admin.pageEdit);
  	app.post('/admin/page/edit/:id', controllers.admin.auth_admin, controllers.admin.pageEdit);

}