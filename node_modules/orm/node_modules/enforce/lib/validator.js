/// <reference path="node.d.ts" />
/// <reference path="enforce.d.ts" />
var Validator = (function () {
    function Validator(validate) {
        this.validator = validate;
        return this;
    }
    Validator.prototype.validate = function (data, next, thisArg, contexts) {
        if (typeof contexts === "undefined") { contexts = {}; }
        this.validator.apply(thisArg, [data, next, contexts]);
    };

    Validator.prototype.ifDefined = function () {
        var _this = this;
        return new Validator(function (value, next, contexts) {
            if (value === undefined || value === null)
                return next();
            return _this.validator(value, next, contexts);
        });
    };

    Validator.prototype.ifNotEmptyString = function () {
        var _this = this;
        return new Validator(function (value, next, contexts) {
            if (value === undefined || value === null)
                return next();
            if (typeof value !== 'string')
                return next();
            if (value.length === 0)
                return next();
            return _this.validator(value, next, contexts);
        });
    };

    Validator.prototype.ifType = function (type) {
        var _this = this;
        return new Validator(function (value, next, contexts) {
            if (typeof value != type)
                return next();
            return _this.validator(value, next, contexts);
        });
    };

    Validator.prototype.ifNotType = function (type) {
        var _this = this;
        return new Validator(function (value, next, contexts) {
            if (typeof value != type)
                return _this.validator(value, next, contexts);
            return next();
        });
    };
    return Validator;
})();


module.exports = Validator;

