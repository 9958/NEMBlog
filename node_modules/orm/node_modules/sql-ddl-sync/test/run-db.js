var program = require("commander");
var Mocha   = require("mocha");
var orm     = require("orm");
var common  = require("./common");
var url     = require("url");

program.version("0.1.0")
       .option("-u, --uri <uri>", "Database URI", String, null)
       .parse(process.argv);

if (!program.uri) {
	program.outputHelp();
	process.exit(1);
}

var uri = url.parse(program.uri);

if (!uri.hasOwnProperty("protocol") || !uri.protocol) {
	program.outputHelp();
	process.exit(1);
}

orm.connect(uri, function (err, db) {
	if (err) throw err;

	common.driver = db.driver;

	testDatabase()
});

function testDatabase() {
	var mocha    = new Mocha({ reporter : "spec" });

	mocha.addFile(__dirname + "/integration/db.js");
	mocha.run(function (failures) {
		process.exit(failures);
	});
}
