var should  = require("should");
var common  = require("../common");
var enforce = require("../..");

describe("enforce.patterns", function () {
	it("should have .match()", function (done) {
		enforce.patterns.match.should.be.a("function");

		return done();
	});
	it("should have .hexString()", function (done) {
		enforce.patterns.hexString.should.be.a("function");

		return done();
	});
	it("should have .email()", function (done) {
		enforce.patterns.email.should.be.a("function");

		return done();
	});
	it("should have .ipv4()", function (done) {
		enforce.patterns.ipv4.should.be.a("function");

		return done();
	});
	it("should have .ipv6()", function (done) {
		enforce.patterns.ipv6.should.be.a("function");

		return done();
	});
	it("should have .mac()", function (done) {
		enforce.patterns.mac.should.be.a("function");

		return done();
	});
	it("should have .uuid3()", function (done) {
		enforce.patterns.uuid3.should.be.a("function");

		return done();
	});
	it("should have .uuid4()", function (done) {
		enforce.patterns.uuid4.should.be.a("function");

		return done();
	});

	describe("with custom error", function () {
	    it("should fail 'abc' on /def/ with 'invalid'", function (done) {
	        enforce.patterns.match(/def/, 'invalid').validate('abc', common.checkValidation(done, 'invalid'));
	    });
	});
});

describe("enforce.patterns.hexString()", function () {
	var validator = enforce.patterns.hexString();

	it("should pass 'ABCDEF0123456789'", function (done) {
		validator.validate('ABCDEF0123456789', common.checkValidation(done));
	});

	it("should pass 'abcdef0123456789'", function (done) {
		validator.validate('abcdef0123456789', common.checkValidation(done));
	});

	it("should not pass 'af830g'", function (done) {
		validator.validate('af830g', common.checkValidation(done, 'not-hex-string'));
	});

	it("should not pass ''", function (done) {
		validator.validate('', common.checkValidation(done, 'not-hex-string'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-hex-string'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-hex-string'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.hexString('custom-error');

		it("should not pass 'af830g' with 'custom-error'", function (done) {
			validator.validate('af830g', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.patterns.email()", function () {
	var validator = enforce.patterns.email();

	it("should pass 'niceandsimple@example.com'", function (done) {
		validator.validate('niceandsimple@example.com', common.checkValidation(done));
	});

	it("should pass 'Very.Common@example.com'", function (done) {
		validator.validate('Very.Common@example.com', common.checkValidation(done));
	});

	it("should pass 'disposable.style.email.with+symbol@example.com'", function (done) {
		validator.validate('disposable.style.email.with+symbol@example.com', common.checkValidation(done));
	});

	it("should not pass 'Abc.example.com'", function (done) {
		validator.validate('Abc.example.com', common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass 'A@b@c@example.com'", function (done) {
		validator.validate('A@b@c@example.com', common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass 'not\\allowed@example.com'", function (done) {
		validator.validate('not\\allowed@example.com', common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass 'abc@example'", function (done) {
		validator.validate('abc@example', common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-valid-email'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-valid-email'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.email('custom-error');

		it("should not pass 'abc@example' with 'custom-error'", function (done) {
			validator.validate('abc@example', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.patterns.ipv4()", function () {
	var validator = enforce.patterns.ipv4();

	it("should pass '1.2.3.4'", function (done) {
		validator.validate('1.2.3.4', common.checkValidation(done));
	});

	it("should pass '1.0.0.1'", function (done) {
		validator.validate('1.0.0.1', common.checkValidation(done));
	});

	it("should pass '1.10.100.254'", function (done) {
		validator.validate('1.10.100.254', common.checkValidation(done));
	});

	it("should not pass '1.10.100.255'", function (done) {
		validator.validate('1.10.100.255', common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should not pass '1.10.100.0'", function (done) {
		validator.validate('1.10.100.0', common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should not pass '0.1.2.3'", function (done) {
		validator.validate('0.1.2.3', common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-valid-ipv4'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.ipv4('custom-error');

		it("should not pass '0.1.2.3' with 'custom-error'", function (done) {
			validator.validate('0.1.2.3', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.patterns.ipv6()", function () {
	var validator = enforce.patterns.ipv6();

	it("should pass '2001:0db8:85a3:0000:0000:8a2e:0370:7334'", function (done) {
		validator.validate('2001:0db8:85a3:0000:0000:8a2e:0370:7334', common.checkValidation(done));
	});

	it("should pass '2001:db8:85a3:0:0:8a2e:370:7334'", function (done) {
		validator.validate('2001:db8:85a3:0:0:8a2e:370:7334', common.checkValidation(done));
	});

	it("should pass '2001:db8:85a3::8a2e:370:7334'", function (done) {
		validator.validate('2001:db8:85a3::8a2e:370:7334', common.checkValidation(done));
	});

	it("should pass '::'", function (done) {
		validator.validate('::', common.checkValidation(done));
	});

	it("should pass '::1'", function (done) {
		validator.validate('::1', common.checkValidation(done));
	});

	it("should not pass '::0'", function (done) {
		validator.validate('::0', common.checkValidation(done, 'not-valid-ipv6'));
	});

	it("should not pass '2001:db8:85a3:8d3:1319:8a2e:370'", function (done) {
		validator.validate('2001:db8:85a3:8d3:1319:8a2e:370', common.checkValidation(done, 'not-valid-ipv6'));
	});

	it("should not pass '2001:db8::8d3::8a2e:370:7348'", function (done) {
		validator.validate('2001:db8::8d3::8a2e:370:7348', common.checkValidation(done, 'not-valid-ipv6'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-valid-ipv6'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-valid-ipv6'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.ipv6('custom-error');

		it("should not pass '0.1.2.3' with 'custom-error'", function (done) {
			validator.validate('0.1.2.3', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.patterns.mac()", function () {
	var validator = enforce.patterns.mac();

	it("should pass '0.1.2.3.4.5'", function (done) {
		validator.validate('0.1.2.3.4.5', common.checkValidation(done));
	});

	it("should pass '01:23:45:67:89:aB'", function (done) {
		validator.validate('01:23:45:67:89:ab', common.checkValidation(done));
	});

	it("should pass '00:1:22:3:44:5'", function (done) {
		validator.validate('00:1:22:3:44:5', common.checkValidation(done));
	});

	it("should not pass '000:11:22:33:44:55'", function (done) {
		validator.validate('000:11:22:33:44:55', common.checkValidation(done, 'not-valid-mac'));
	});

	it("should not pass 'aa:bb:dd:ee:ff:gg'", function (done) {
		validator.validate('aa:bb:dd:ee:ff:gg', common.checkValidation(done, 'not-valid-mac'));
	});

	it("should not pass 'aa:bb::cc:dd:ee'", function (done) {
		validator.validate('aa:bb::cc:dd:ee', common.checkValidation(done, 'not-valid-mac'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-valid-mac'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-valid-mac'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.mac('custom-error');

		it("should not pass '0.1.2.3' with 'custom-error'", function (done) {
			validator.validate('0.1.2.3', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.patterns.uuid3()", function () {
	var validator = enforce.patterns.uuid3();

	it("should pass '6ba7b810-9dad-31d1-80b4-00c04fd430c8'", function (done) {
		validator.validate('6ba7b810-9dad-31d1-80b4-00c04fd430c8', common.checkValidation(done));
	});

	it("should not pass '6ba7b810-9dad-11d1-80b4-00c04fd430c8'", function (done) {
		validator.validate('6ba7b810-9dad-11d1-80b4-00c04fd430c8', common.checkValidation(done, 'not-valid-uuid3'));
	});

	it("should not pass '6ba7b810-9dad-31d1-70b4-00c04fd430c8'", function (done) {
		validator.validate('6ba7b810-9dad-31d1-70b4-00c04fd430c8', common.checkValidation(done, 'not-valid-uuid3'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-valid-uuid3'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-valid-uuid3'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.uuid3('custom-error');

		it("should not pass '6ba7b810-9dad-11d1-80b4-00c04fd430c8' with 'custom-error'", function (done) {
			validator.validate('6ba7b810-9dad-11d1-80b4-00c04fd430c8', common.checkValidation(done, 'custom-error'));
		});
	});
});

describe("enforce.patterns.uuid4()", function () {
	var validator = enforce.patterns.uuid4();

	it("should pass '6ba7b810-9dad-41d1-80b4-00c04fd430c8'", function (done) {
		validator.validate('6ba7b810-9dad-41d1-80b4-00c04fd430c8', common.checkValidation(done));
	});

	it("should not pass '6ba7b810-9dad-11d1-80b4-00c04fd430c8'", function (done) {
		validator.validate('6ba7b810-9dad-11d1-80b4-00c04fd430c8', common.checkValidation(done, 'not-valid-uuid4'));
	});

	it("should not pass '6ba7b810-9dad-31d1-70b4-00c04fd430c8'", function (done) {
		validator.validate('6ba7b810-9dad-31d1-70b4-00c04fd430c8', common.checkValidation(done, 'not-valid-uuid4'));
	});

	it("should not pass null", function (done) {
	    validator.validate(null, common.checkValidation(done, 'not-valid-uuid4'));
	});

	it("should not pass undefined", function (done) {
	    validator.validate(undefined, common.checkValidation(done, 'not-valid-uuid4'));
	});

	it("should pass null with .ifDefined()", function (done) {
	    validator.ifDefined().validate(null, common.checkValidation(done));
	});

	it("should pass undefined with .ifDefined()", function (done) {
	    validator.ifDefined().validate(undefined, common.checkValidation(done));
	});

	describe("with custom error", function () {
		var validator = enforce.patterns.uuid4('custom-error');

		it("should not pass '6ba7b810-9dad-11d1-80b4-00c04fd430c8' with 'custom-error'", function (done) {
			validator.validate('6ba7b810-9dad-11d1-80b4-00c04fd430c8', common.checkValidation(done, 'custom-error'));
		});
	});
});
