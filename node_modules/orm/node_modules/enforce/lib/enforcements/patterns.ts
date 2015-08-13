/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />

import Validator = require('../validator');

/**
 * Check if a value matches a given pattern.
 * You can define a pattern string and regex
 * modifiers or just send the RegExp object
 * as 1st argument.
 **/
export function match(pattern: RegExp, message?: string): enforce.IValidator;
export function match(pattern: string, modifiers?: string, message?: string): enforce.IValidator;
export function match(pattern: any, modifiers: string = 'i', message: string = 'no-pattern-match'): enforce.IValidator {
    if (arguments.length == 2) {
        message = modifiers;
        modifiers = 'i';
    }

    if (typeof pattern === 'string') {
        pattern = new RegExp(pattern, modifiers);
    }

    return new Validator((value: string, next) => {
        if (typeof value === 'string' && value.match(pattern)) return next();
        return next(message);
    });
}

/**
 * Check if a value is an hexadecimal string
 * (letters from A to F and numbers).
 **/
export function hexString(message: string = 'not-hex-string'): enforce.IValidator {
    return match("^[a-f0-9]+$", "i", message);
}

/**
 * Check if a value is an e-mail address
 * (simple checking, works 99%).
 **/
export function email(message: string = 'not-valid-email') {
    return match("^[a-z0-9\\._%\\+\\-]+@[a-z0-9\\.\\-]+\\.[a-z]{2,6}$", "i", message);
}

/**
 * Check if it's a valid IPv4 address.
 **/
export function ipv4(message: string = 'not-valid-ipv4'): enforce.IValidator {
    var p1 = "([1-9]|1[0-9][0-9]?|2[0-4][0-9]|25[0-4])";
    var p2 = "([0-9]|1[0-9][0-9]?|2[0-4][0-9]|25[0-4])";
    return match("^" + [p1, p2, p2, p1].join("\\.") + "$", "", message);
}

/**
 * Check if it's a valid IPv6 address.
 **/
export function ipv6(message: string = 'not-valid-ipv6'): enforce.IValidator {
    var p1 = new RegExp("^([a-f0-9]{1,4}:){7}[a-f0-9]{1,4}$", "i");
    var p2 = new RegExp("^([a-f0-9]{1,4}:)*[a-f0-9]{1,4}$", "i");

    return new Validator(function (value, next) {
        if (typeof value != "string") {
            return next(message);
        }
        // unspecified / loopback
        if ([ "::", "::1" ].indexOf(value) >= 0) {
            return next();
        }
        // normal address (with possible leading zeroes omitted)
        if (value.match(p1)) {
            return next();
        }
        if (value.indexOf("::") == -1) {
            return next(message);
        }
        // grouping zeroes
        var g = value.split("::");

        if (g.length != 2) {
            return next(message);
        }
        if (!g[0].match(p2) || !g[1].match(p2)) {
            return next(message);
        }
        return next();
    });
}

/**
 * Check if it's a valid MAC address.
 **/
export function mac(message: string = 'not-valid-mac'): enforce.IValidator {
    var p = "[0-9a-f]{1,2}";
    var s = "[\\.:]";
    return match("^" + [p, p, p, p, p, p].join(s) + "$", "i", message);
}

/**
 * Check if it's a valid UUID version 3 (MD5 hash).
 * http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_3_.28MD5_hash.29
 **/
export function uuid3(message: string = 'not-valid-uuid3'): enforce.IValidator {
    return exports.match("^[a-f0-9]{8}\-[a-f0-9]{4}\-3[a-f0-9]{3}\-[89ab][a-f0-9]{3}\-[a-f0-9]{12}$", "i", message);
}

/**
 * Check if it's a valid UUID version 4 (random).
 * http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29
 **/
export function uuid4(message: string = 'not-valid-uuid3'): enforce.IValidator {
    return exports.match("^[a-f0-9]{8}\-[a-f0-9]{4}\-4[a-f0-9]{3}\-[89ab][a-f0-9]{3}\-[a-f0-9]{12}$", "i", message);
}
