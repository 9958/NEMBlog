var test_folder = __dirname + "/integration/";

var Mocha       = require("mocha");
var path        = require("path");
var fs          = require("fs");
var is_tty      = require("tty").isatty(process.stdout);

if (!is_tty) {
	Mocha.reporters.Base.useColors = false;
}

var mocha = new Mocha({
	reporter : (is_tty ? "spec" : "dot")
});

fs.readdirSync(test_folder).filter(function (file) {
	return (file.substr(-3) === ".js" && file != "db.js");
}).forEach(function (file) {
	mocha.addFile(
		path.join(test_folder, file)
	);
});

mocha.run(function (failures) {
	process.exit(failures);
});
