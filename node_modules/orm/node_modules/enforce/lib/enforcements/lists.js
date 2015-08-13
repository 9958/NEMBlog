/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />
var Validator = require('../validator');

function inside(list, message) {
    if (typeof message === "undefined") { message = 'outside-list'; }
    return new Validator(function (value, next) {
        if (list.indexOf(value) >= 0)
            return next();
        return next(message);
    });
}
exports.inside = inside;

function outside(list, message) {
    if (typeof message === "undefined") { message = 'inside-list'; }
    return new Validator(function (value, next) {
        if (list.indexOf(value) === -1)
            return next();
        return next(message);
    });
}
exports.outside = outside;

