/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />
/// <reference path="ranges.ts" />
var Validator = require('../validator');
var Ranges = require('./ranges');

function required(message) {
    if (typeof message === "undefined") { message = 'required'; }

    return new Validator(function (value, next) {
        if (value === null || value === undefined) {
            return next(message);
        }

        return next();
    });
}
exports.required = required;

function notEmptyString(message) {
    if (typeof message === "undefined") { message = 'empty-string'; }

    return Ranges.length(1, undefined, message);
}
exports.notEmptyString = notEmptyString;

function sameAs(property, message) {
	if (typeof message === "undefined") { message = 'not-same-as'; }

	return new Validator(function (value, next) {
		if (value !== this[property]) {
			return next(message);
		}

		return next();
	});
}
exports.sameAs = sameAs;
