var should  = require("should");
var common  = require("../common");
var enforce = require("../..");

describe("enforce.lists", function () {
	it("should have .inside()", function (done) {
		enforce.lists.inside.should.be.a("function");

		return done();
	});
	it("should have .outside()", function (done) {
		enforce.lists.outside.should.be.a("function");

		return done();
	});
});

describe("enforce.lists.inside([ 1, 2, 3 ])", function () {
	var validator = enforce.lists.inside([ 1, 2, 3 ]);

	it("should pass 1", function (done) {
		validator.validate(1, common.checkValidation(done));
	});

	it("should pass 3", function (done) {
		validator.validate(3, common.checkValidation(done));
	});

	it("should not pass -1", function (done) {
		validator.validate(-1, common.checkValidation(done, 'outside-list'));
	});

	it("should not pass '1'", function (done) {
		validator.validate('1', common.checkValidation(done, 'outside-list'));
	});

	it("should not pass []", function (done) {
		validator.validate([], common.checkValidation(done, 'outside-list'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'outside-list'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'outside-list'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.lists.inside([ 1, 2, 3 ], 'custom-error');

		it("should not pass -1 with 'custom-error'", function (done) {
			validator.validate(-1, common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.lists.outside([ 1, 2, 3 ])", function () {
	var validator = enforce.lists.outside([ 1, 2, 3 ]);

	it("should pass 4", function (done) {
		validator.validate(4, common.checkValidation(done));
	});

	it("should pass -2", function (done) {
		validator.validate(-2, common.checkValidation(done));
	});

	it("should pass ''", function (done) {
		validator.validate('', common.checkValidation(done));
	});

	it("should pass null", function (done) {
		validator.validate(null, common.checkValidation(done));
	});

	it("should not pass 2", function (done) {
		validator.validate(2, common.checkValidation(done, 'inside-list'));
	});

	describe("with custom error", function () {
		var validator = enforce.lists.outside([ 1, 2, 3 ], 'custom-error');

		it("should not pass 2 with 'custom-error'", function (done) {
			validator.validate(2, common.checkValidation(done, 'custom-error'));
		});
	});
});
