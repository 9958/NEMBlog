var Sync    = require("../../lib/Sync").Sync;
var common  = require("../common");
var should  = require("should");
var sync    = new Sync({
	driver  : common.driver,
	debug   : function (text) {
		 //console.log("> %s", text);
	}
});

sync.defineCollection(common.table, {
  id     : { type: "serial", key: true, serial: true },
  name   : { type: "text", required: true },
  age    : { type: "integer" },
  male   : { type: "boolean" },
  born   : { type: "date", time: true },
  born2  : { type: "date" },
  int2   : { type: "integer", size: 2 },
  int4   : { type: "integer", size: 4 },
  int8   : { type: "integer", size: 8 },
  float4 : { type: "number",  size: 4 },
  float8 : { type: "number",  size: 8 },
  photo  : { type: "binary" }
});

// These will fail because autosync has been disabled pending data integrity concerns.

describe("db", function () {
	before(common.dropTable());

	describe("Synching", function () {
		it("should create the table", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes");

				return done();
			});
		});

		it("should have no changes on second call", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes", 0);

				return done();
			});
		});
	});

	if (common.dialect != "sqlite") {
		describe("Dropping a column", function () {
			before(common.dropColumn('born'));

			xit("should recreate it on first call", function (done) {
				sync.sync(function (err, info) {
					should.not.exist(err);
					should.exist(info);
					info.should.have.property("changes", 1);

					return done();
				});
			});

			it("should have no changes on second call", function (done) {
				sync.sync(function (err, info) {
					should.not.exist(err);
					should.exist(info);
					info.should.have.property("changes", 0);

					return done();
				});
			});
		});

		xdescribe("Dropping a column that has an index", function () {
			before(common.dropColumn('born2'));

			it("should recreate column and index on first call", function (done) {
				sync.sync(function (err, info) {
					should.not.exist(err);
					should.exist(info);
					info.should.have.property("changes", 2);

					return done();
				});
			});

			it("should have no changes on second call", function (done) {
				sync.sync(function (err, info) {
					should.not.exist(err);
					should.exist(info);
					info.should.have.property("changes", 0);

					return done();
				});
			});
		});

		xdescribe("Adding a column", function () {
			before(common.addColumn('unknown_col'));

			it("should drop column on first call", function (done) {
				sync.sync(function (err, info) {
					should.not.exist(err);
					should.exist(info);
					info.should.have.property("changes", 1);

					return done();
				});
			});

			it("should have no changes on second call", function (done) {
				sync.sync(function (err, info) {
					should.not.exist(err);
					should.exist(info);
					info.should.have.property("changes", 0);

					return done();
				});
			});
		});
	}

	xdescribe("Changing a column", function () {
		before(common.changeColumn('int4'));

		it("should update column on first call", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes", 1);

				return done();
			});
		});

		it("should have no changes on second call", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes", 0);

				return done();
			});
		});
	});

	xdescribe("Adding an index", function () {
		before(common.addIndex('xpto', 'int4'));

		it("should drop index on first call", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes", 1);

				return done();
			});
		});

		it("should have no changes on second call", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes", 0);

				return done();
			});
		});
	});

	xdescribe("Dropping an index", function () {
		before(common.dropIndex('idx2'));

		it("should drop index on first call", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes", 1);

				return done();
			});
		});

		it("should have no changes on second call", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes", 0);

				return done();
			});
		});
	});

	xdescribe("Changing index to unique index", function () {
		before(function (done) {
			common.dropIndex('float8_index')(function () {
				common.addIndex('float8_index', 'float8', true)(done);
			});
		});

		it("should drop index and recreate it on first call", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes", 1);

				return done();
			});
		});

		it("should have no changes on second call", function (done) {
			sync.sync(function (err, info) {
				should.not.exist(err);
				should.exist(info);
				info.should.have.property("changes", 0);

				return done();
			});
		});
	});
});
