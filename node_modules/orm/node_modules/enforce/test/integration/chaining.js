var should  = require("should");
var common  = require("../common");
var enforce = require("../..");

describe("chaining", function () {
    var validator = enforce.patterns.match(/test/, 'invalid');

    it("should have .ifDefined()", function (done) {
        validator.ifDefined.should.be.a("function");

		return done();
    });
    it("should have .ifNotEmptyString()", function (done) {
        validator.ifNotEmptyString.should.be.a("function");

        return done();
    });
    it("should have .ifType()", function (done) {
        validator.ifType.should.be.a("function");

        return done();
    });
    it("should have .ifNotType()", function (done) {
        validator.ifNotType.should.be.a("function");

        return done();
    });

    describe(".ifDefined()", function () {
        it("should skip validations if the property is null", function (done) {
            validator.ifDefined().validate(null, common.checkValidation(done));
        });

        it("should skip validations if the property is undefined", function (done) {
            validator.ifDefined().validate(undefined, common.checkValidation(done));
        });

        it("should allow validations if the property is defined", function (done) {
            validator.ifDefined().validate('invalid', common.checkValidation(done, 'invalid'));
        });
    });
    
    describe(".ifNotEmptyString()", function () {
        it("should skip validations if the property is null", function (done) {
            validator.ifNotEmptyString().validate(null, common.checkValidation(done));
        });

        it("should skip validations if the property is undefined", function (done) {
            validator.ifNotEmptyString().validate(undefined, common.checkValidation(done));
        });

        it("should skip validations if the property is not a string", function (done) {
            validator.ifNotEmptyString().validate({}, common.checkValidation(done));
        });

        it("should allow validations if the property is a valid string", function (done) {
            validator.ifNotEmptyString().validate('invalid', common.checkValidation(done, 'invalid'));
        });
    });

    describe(".ifType('string')", function () {
        it("should skip validations if the property is null", function (done) {
            validator.ifType('string').validate(null, common.checkValidation(done));
        });

        it("should skip validations if the property is undefined", function (done) {
            validator.ifType('string').validate(undefined, common.checkValidation(done));
        });

        it("should skip validations if the property is not a string", function (done) {
            validator.ifType('string').validate({}, common.checkValidation(done));
        });

        it("should allow validations if the property is a string", function (done) {
            validator.ifType('string').validate('invalid', common.checkValidation(done, 'invalid'));
        });
    });

    describe(".ifNotType('string')", function () {
        it("should allow validations if the property is null", function (done) {
            validator.ifNotType('string').validate(null, common.checkValidation(done, 'invalid'));
        });

        it("should allow validations if the property is undefined", function (done) {
            validator.ifNotType('string').validate(undefined, common.checkValidation(done, 'invalid'));
        });

        it("should allow validations if the property is not a string", function (done) {
            validator.ifNotType('string').validate({}, common.checkValidation(done, 'invalid'));
        });

        it("should skip validations if the property is a string", function (done) {
            validator.ifNotType('string').validate('invalid', common.checkValidation(done));
        });
    });
});
