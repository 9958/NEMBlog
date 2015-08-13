/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />

import Validator = require('../validator');

export function inside(list: string[], message?: string): enforce.IValidator;
export function inside(list: number[], message?: string): enforce.IValidator;
export function inside(list: any[], message: string = 'outside-list'): enforce.IValidator {
    return new Validator((value, next) => {
        if (list.indexOf(value) >= 0) return next();
        return next(message);
    });
}

export function outside(list: string[], message?: string): enforce.IValidator;
export function outside(list: number[], message?: string): enforce.IValidator;
export function outside(list: any[], message: string = 'inside-list'): enforce.IValidator {
    return new Validator((value, next) => {
        if (list.indexOf(value) === -1) return next();
        return next(message);
    });
}