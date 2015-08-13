var should  = require("should");
var common  = require("../common");
var enforce = require("../..");

describe("enforce", function () {
	it("should have .required()", function (done) {
		enforce.required.should.be.a("function");

		return done();
	});
	it("should have .notEmptyString()", function (done) {
		enforce.notEmptyString.should.be.a("function");

		return done();
	});
	it("should have .sameAs()", function (done) {
		enforce.sameAs.should.be.a("function");

		return done();
	});
	it("should have a chainable .ifDefined() function", function (done) {
	    enforce.required().ifDefined.should.be.a("function");

	    return done();
	});
});

describe("enforce.required()", function () {
	var validator = enforce.required();

	it("should pass 1", function (done) {
		validator.validate(1, common.checkValidation(done));
	});

	it("should pass 0", function (done) {
		validator.validate(0, common.checkValidation(done));
	});

	it("should pass ''", function (done) {
		validator.validate('', common.checkValidation(done));
	});

	it("should pass false", function (done) {
		validator.validate(false, common.checkValidation(done));
	});

	it("should not pass null", function (done) {
		validator.validate(null, common.checkValidation(done, 'required'));
	});

	it("should not pass undefined", function (done) {
		validator.validate(undefined, common.checkValidation(done, 'required'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.required('custom-error');

		it("should not pass null with 'custom-error'", function (done) {
			validator.validate(null, common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.notEmptyString()", function () {
	var validator = enforce.notEmptyString();

	it("should pass 'hello'", function (done) {
		validator.validate('hello', common.checkValidation(done));
	});

	it("should pass ' '", function (done) {
		validator.validate(' ', common.checkValidation(done));
	});

	it("should not pass ''", function (done) {
		validator.validate('', common.checkValidation(done, 'empty-string'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'undefined'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'undefined'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.notEmptyString('custom-error');

		it("should not pass '' with 'custom-error'", function (done) {
			validator.validate('', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.sameAs()", function () {
	var validator = enforce.sameAs('other');

	it("should pass 'hello' === 'hello'", function (done) {
		validator.validate('hello', common.checkValidation(done), { other: 'hello' });
	});

	it("should pass '' === ''", function (done) {
		validator.validate('', common.checkValidation(done), { other: '' });
	});

	it("should not pass '' === 0", function (done) {
		validator.validate('', common.checkValidation(done, 'not-same-as'), { other: 0 });
	});

	it("should not pass '' === undefined", function (done) {
	    validator.validate('', common.checkValidation(done, 'not-same-as'), { other: undefined });
	});

	describe("with custom error", function () {
		var validator = enforce.sameAs('other', 'custom-error');

		it("should not pass 'hello' === '' with 'custom-error'", function (done) {
			validator.validate('hello', common.checkValidation(done, 'custom-error'), { other: '' });
		});
	});
});
