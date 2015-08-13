/// <reference path="../node.d.ts" />
/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />

import Validator = require('../validator');

export function number(min: number, max: number, message: string = 'out-of-range-number'): enforce.IValidator {
    return new Validator((value: number, next) => {
        if (value === undefined || value === null) return next('undefined');
        if (min === undefined && value <= max) return next();
        if (max === undefined && value >= min) return next();
        if (value >= min && value <= max) return next();
        return next(message);
    });
}

export function length(min: number, max: number, message: string = 'out-of-range-length'): enforce.IValidator {
    return new Validator((value: any[], next) => {
        if (value === undefined || value === null) return next('undefined');
        if (min === undefined && value.length <= max) return next();
        if (max === undefined && value.length >= min) return next();
        if (value.length >= min && value.length <= max) return next();
        return next(message);
    });
}