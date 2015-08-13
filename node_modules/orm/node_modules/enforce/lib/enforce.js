/// <reference path="enforce.d.ts" />
/// <reference path="validator.ts" />
var Validator = require('./validator');

var Enforce = (function () {
    function Enforce(options) {
        this.validations = {};
        this.contexts = {};
        this.options = {
            returnAllErrors: options && !!options.returnAllErrors
        };

        return this;
    }
    Enforce.prototype.add = function (property, validator) {
        if (typeof validator === 'function' && validator.length >= 2) {
            validator = new Validator(validator);
        }

        if (validator.validate === undefined) {
            throw new Error('Missing validator (function) in Enforce.add(property, validator)');
        }

        if (!this.validations.hasOwnProperty(property))
            this.validations[property] = [];

        this.validations[property].push(validator);
        return this;
    };

    Enforce.prototype.context = function (name, value) {
        if (name && value) {
            this.contexts[name] = value;
            return this;
        } else if (name)
            return this.contexts[name];
else
            return this.contexts;
    };

    Enforce.prototype.clear = function () {
        this.validations = {};
    };

    Enforce.prototype.check = function (data, cb) {
        var _this = this;
        var validations = [];

        var errors = [];
        var next = function () {
            if (validations.length === 0) {
                if (errors.length > 0)
                    return cb(errors);
else
                    return cb(null);
            }

            var validation = validations.shift();
            _this.contexts.property = validation.property;

            validation.validator.validate(data[validation.property], function (message) {
                if (message) {
                    var err = new Error(message);
                    err.property = validation.property;
                    err.value = data[validation.property];
                    err.msg = message;
                    err.type = "validation";

                    if (!this.options.returnAllErrors)
                        return cb(err);
                    errors.push(err);
                }

                return next();
            }.bind(_this), data, _this.contexts);
        };

        for (var k in this.validations) {
            for (var i = 0; i < this.validations[k].length; i++) {
                validations.push({
                    property: k,
                    validator: this.validations[k][i]
                });
            }
        }

        return next();
    };
    return Enforce;
})();


module.exports = Enforce;

