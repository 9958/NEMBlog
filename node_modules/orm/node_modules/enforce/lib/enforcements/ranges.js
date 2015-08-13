/// <reference path="../node.d.ts" />
/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />
var Validator = require('../validator');

function number(min, max, message) {
    if (typeof message === "undefined") { message = 'out-of-range-number'; }
    return new Validator(function (value, next) {
        if (value === undefined || value === null)
            return next('undefined');
        if (min === undefined && value <= max)
            return next();
        if (max === undefined && value >= min)
            return next();
        if (value >= min && value <= max)
            return next();
        return next(message);
    });
}
exports.number = number;

function length(min, max, message) {
    if (typeof message === "undefined") { message = 'out-of-range-length'; }
    return new Validator(function (value, next) {
        if (value === undefined || value === null)
            return next('undefined');
        if (min === undefined && value.length <= max)
            return next();
        if (max === undefined && value.length >= min)
            return next();
        if (value.length >= min && value.length <= max)
            return next();
        return next(message);
    });
}
exports.length = length;

