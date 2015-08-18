var controllers = require('../app/controllers');

module.exports = function(app){
	app.get('/', controllers.c_home);

	/*admin*/
	app.get('/admin', controllers.c_admin.auth_admin, controllers.c_admin.index);
	app.get('/admin/install', controllers.c_admin.install);
	app.post('/admin/install', controllers.c_admin.install);
}