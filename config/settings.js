var path = require('path');

var settings = {
	path	: path.normalize(path.join(__dirname,'..')),
	port	: process.env.NODE_PORT || 3000,
	database	: "mysql://root:@localhost:3306/nemblog"
}

module.exports = settings;