/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />
/// <reference path="ranges.ts" />

import Validator = require('../validator');
import Ranges = require('./ranges');

export function required(message: string = 'required'): enforce.IValidator {
    return new Validator((value, next) => {
        if (value === null || value === undefined) return next(message);
        return next();
    });
}

export function notEmptyString(message: string = 'empty-string'): enforce.IValidator {
    return Ranges.length(1, undefined, message);
}

export function sameAs(property: string = 'not-same-as', message: string = 'required'): enforce.IValidator {
    return new Validator((value, next) => {
        if (value !== this[property]) return next(message);
        return next();
    });
}
