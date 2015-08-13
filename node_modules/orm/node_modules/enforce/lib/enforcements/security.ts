/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />
/// <reference path="patterns.ts" />

import patterns = require('./patterns');
import Validator = require('../validator');

export interface SecurityUsernameOptions {
    length: number;
    expr?: RegExp;
}

var creditcard_prefixes: {
    [id: string]: string[]
} = {
        amex: ["34", "37"],
        maestro: ["5018", "5020", "5038", "5893", "6304", "6759", "6761", "6762", "6763"],
        mastercard: ["51", "52", "53", "54", "55"],
        discover4: ["6011"],
        discover3: ["644", "645", "646", "647", "648", "649"],
        discover2: ["65"]
    };

export function username(message?: string): enforce.IValidator;
export function username(options: SecurityUsernameOptions, message?: string): enforce.IValidator;
export function username(options: SecurityUsernameOptions = { length: 2, expr: null }, message: string = 'invalid-username'): enforce.IValidator {
    if (typeof options === 'string') {
        message = options.toString();
        options = { length: 2, expr: null };
    }

    if (!options.expr) {
        options.expr = new RegExp("^[a-z_][a-z0-9_\\-]{" + (options.length - 1) + ",}$", "i");
    }

    return patterns.match(options.expr, message);
}

export function password(message?: string): enforce.IValidator;
export function password(checks: string, message?: string): enforce.IValidator;
export function password(checks?: string, message?: string): enforce.IValidator {
    if (!message) {
        message = checks;
        checks = "luns6";
    }

    if (!message) {
        message = "weak-password";
    }

    var m = checks.match(/([0-9]+)/);
    var min_len = (m ? parseInt(m[1], 10) : null);

    return new Validator((value, next) => {
        if (!value) return next(message);

        if (checks.indexOf("l") >= 0 && !value.match(/[a-z]/)) return next(message);
        if (checks.indexOf("u") >= 0 && !value.match(/[A-Z]/)) return next(message);
        if (checks.indexOf("n") >= 0 && !value.match(/[0-9]/)) return next(message);
        if (checks.indexOf("s") >= 0 && !value.match(/[^a-zA-Z0-9]/)) return next(message);
        if (min_len !== null && min_len > value.length) return next(message);

        return next();
    });
}

export function creditcard(types: string[]= ["amex", "visa", "maestro", "discover", "mastercard"], message: string = 'not-valid-creditcard'): enforce.IValidator {
    return new Validator((v, next) => {
        if (!v) return next(message);

        v = "" + v;

        var ok = false;

        // check right now for the possible types
        for (var i = 0; i < types.length; i++) {
            switch (types[i]) {
                case "amex":
                    if (v.length != 15) break;

                    ok = (creditcard_prefixes["amex"].indexOf(v.substr(0, 2)) >= 0);
                    break;
                case "visa":
                    if (v.length < 13) break;
                    if (v.length > 16) break;

                    ok = (v[0] == "4");
                    break;
                case "maestro":
                    if (v.length < 16) break;
                    if (v.length > 19) break;

                    ok = (creditcard_prefixes["maestro"].indexOf(v.substr(0, 4)) >= 0);
                    break;
                case "mastercard":
                    if (v.length < 16) break;
                    if (v.length > 19) break;

                    ok = (creditcard_prefixes["mastercard"].indexOf(v.substr(0, 2)) >= 0);
                    break;
                case "discover":
                    if (v.length != 16) break;

                    ok = (creditcard_prefixes["discover4"].indexOf(v.substr(0, 4)) >= 0) ||
                    (creditcard_prefixes["discover3"].indexOf(v.substr(0, 3)) >= 0) ||
                    (creditcard_prefixes["discover2"].indexOf(v.substr(0, 2)) >= 0);

                    if (!ok) {
                        var prefix = +v.substr(0, 6);

                        ok = (!isNaN(prefix) && prefix >= 622126 && prefix <= 622925);
                    }
                    break;
                case "luhn":
                    // fallback
                    ok = true;
                    break;
            }
            if (ok) break;
        }

        if (!ok) {
            return next(message);
        }

        // it's in one of possible types, let's check Luhn
        var check = +v[v.length - 1];

        if (isNaN(check)) {
            return next(message);
        }

        var digits = v.slice(0, v.length - 1).split('');
        digits.reverse();

        for (var i = 0; i < digits.length; i++) {
            digits[i] = +digits[i];
            if (isNaN(digits[i])) {
                return next(message);
            }

            if (i % 2 === 0) {
                digits[i] *= 2;
                if (digits[i] > 9) {
                    digits[i] -= 9;
                }
            }
        }

        check += digits.reduce(function (a, b) { return a + b; });

        return next(check % 10 !== 0 ? message : null);
    });
}