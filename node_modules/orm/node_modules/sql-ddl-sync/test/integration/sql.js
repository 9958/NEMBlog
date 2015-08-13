var should  = require("should");
var common  = require("../common");
var SQL     = require("../../lib/SQL");
var driver  = common.fakeDriver;

describe("SQL.CREATE_TABLE", function () {
	it("should return a CREATE TABLE", function (done) {
		SQL.CREATE_TABLE({
			name    : "fake_table",
			columns : [ "first_fake_column", "second_fake_column" ],
			keys    : [ "my_primary_key" ]
		}, driver).should.equal("CREATE TABLE $$fake_table$$ (first_fake_column, second_fake_column, " +
		                         "PRIMARY KEY ($$my_primary_key$$))");

		return done();
	});
});

describe("SQL.CREATE_TABLE", function () {
	it("should return a CREATE TABLE", function (done) {
		SQL.CREATE_TABLE({
			name    : "fake_table",
			columns : [ "first_fake_column", "second_fake_column" ]
		}, driver).should.equal("CREATE TABLE $$fake_table$$ (first_fake_column, second_fake_column)");

		return done();
	});
});

describe("SQL.DROP_TABLE", function () {
	it("should return a DROP TABLE", function (done) {
		SQL.DROP_TABLE({
			name    : "fake_table"
		}, driver).should.equal("DROP TABLE $$fake_table$$");

		return done();
	});
});


describe("SQL.ALTER_TABLE_ADD_COLUMN", function () {
	it("should be correct", function (done) {
		SQL.ALTER_TABLE_ADD_COLUMN({
			name    : "fake_table",
			column  : "my_fake_column"
		}, driver).should.equal("ALTER TABLE $$fake_table$$ ADD my_fake_column");

		return done();
	});

	it("should be correct when first is true", function (done) {
		SQL.ALTER_TABLE_ADD_COLUMN({
			name    : "fake_table",
			column  : "my_fake_column",
			first   : true
		}, driver).should.equal("ALTER TABLE $$fake_table$$ ADD my_fake_column FIRST");

		return done();
	});

	it("should be correct when after is specified", function (done) {
		SQL.ALTER_TABLE_ADD_COLUMN({
			name    : "fake_table",
			column  : "my_fake_column",
			after   : "other_column"
		}, driver).should.equal("ALTER TABLE $$fake_table$$ ADD my_fake_column AFTER $$other_column$$");

		return done();
	});
});

describe("SQL.ALTER_TABLE_RENAME_COLUMN", function () {
	it("should be correct", function (done) {
		SQL.ALTER_TABLE_RENAME_COLUMN({
			name       : "fake_table",
			oldColName : "usersfullname",
			newColName : "name"
		}, driver).should.equal("ALTER TABLE $$fake_table$$ RENAME COLUMN $$usersfullname$$ TO $$name$$");

		return done();
	});
});

describe("SQL.ALTER_TABLE_MODIFY_COLUMN", function () {
	it("should return an ALTER TABLE", function (done) {
		SQL.ALTER_TABLE_MODIFY_COLUMN({
			name    : "fake_table",
			column  : "my_fake_column"
		}, driver).should.equal("ALTER TABLE $$fake_table$$ MODIFY my_fake_column");

		return done();
	});
});

describe("SQL.ALTER_TABLE_DROP_COLUMN", function () {
	it("should return an ALTER TABLE", function (done) {
		SQL.ALTER_TABLE_DROP_COLUMN({
			name    : "fake_table",
			column  : "my_fake_column"
		}, driver).should.equal("ALTER TABLE $$fake_table$$ DROP $$my_fake_column$$");

		return done();
	});
});

describe("SQL.CREATE_INDEX", function () {
	it("should return an CREATE INDEX", function (done) {
		SQL.CREATE_INDEX({
			name       : "fake_index",
			collection : "fake_table",
			columns    : [ "my_fake_column" ]
		}, driver).should.equal("CREATE INDEX $$fake_index$$ ON $$fake_table$$ ($$my_fake_column$$)");

		return done();
	});

	it("should return an CREATE UNIQUE INDEX if unique passed", function (done) {
		SQL.CREATE_INDEX({
			name       : "fake_index",
			collection : "fake_table",
			unique     : true,
			columns    : [ "my_fake_column" ]
		}, driver).should.equal("CREATE UNIQUE INDEX $$fake_index$$ ON $$fake_table$$ ($$my_fake_column$$)");

		return done();
	});
});

describe("SQL.DROP_INDEX", function () {
	it("should return an DROP INDEX", function (done) {
		SQL.DROP_INDEX({
			name       : "fake_index",
			collection : "fake_table"
		}, driver).should.equal("DROP INDEX $$fake_index$$ ON $$fake_table$$");

		return done();
	});
});
