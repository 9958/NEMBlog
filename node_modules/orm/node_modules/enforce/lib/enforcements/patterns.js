/// <reference path="../node.d.ts" />
/// <reference path="../enforce.d.ts" />
/// <reference path="../validator.ts" />
var Validator = require('../validator');

function match(pattern, modifiers, message) {
    if (typeof modifiers === "undefined") { modifiers = 'i'; }
    if (typeof message === "undefined") { message = 'no-pattern-match'; }
    if (arguments.length == 2) {
        message = modifiers;
        modifiers = 'i';
    }

    if (typeof pattern === 'string') {
        pattern = new RegExp(pattern, modifiers);
    }

    return new Validator(function (value, next) {
        if (typeof value === 'string' && value.match(pattern))
            return next();
        return next(message);
    });
}
exports.match = match;

/**
 * Check if a value is an hexadecimal string
 * (letters from A to F and numbers).
 **/
function hexString(message) {
    if (typeof message === "undefined") { message = 'not-hex-string'; }
    return exports.match("^[a-f0-9]+$", "i", message);
}
exports.hexString = hexString;

/**
 * Check if a value is an e-mail address
 * (simple checking, works 99%).
 **/
function email(message) {
    if (typeof message === "undefined") { message = 'not-valid-email'; }
    return exports.match("^[a-z0-9\\._%\\+\\-]+@[a-z0-9\\.\\-]+\\.[a-z]{2,6}$", "i", message);
}
exports.email = email;

/**
 * Check if it's a valid IPv4 address.
 **/
function ipv4(message) {
    if (typeof message === "undefined") { message = 'not-valid-ipv4'; }
    var p1 = "([1-9]|1[0-9][0-9]?|2[0-4][0-9]|25[0-4])";
    var p2 = "([0-9]|1[0-9][0-9]?|2[0-4][0-9]|25[0-4])";
    return exports.match("^" + [p1, p2, p2, p1].join("\\.") + "$", "", message);
}
exports.ipv4 = ipv4;

/**
 * Check if it's a valid IPv6 address.
 **/
function ipv6(message) {
    if (typeof message === "undefined") { message = 'not-valid-ipv6'; }

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
exports.ipv6 = ipv6;

/**
 * Check if it's a valid MAC address.
 **/
function mac(message) {
    if (typeof message === "undefined") { message = 'not-valid-mac'; }
    var p = "[0-9a-f]{1,2}";
    var s = "[\\.:]";
    return exports.match("^" + [p,p,p,p,p,p].join(s) + "$", "i", message);
}
exports.mac = mac;

/**
 * Check if it's a valid UUID version 3 (MD5 hash).
 * http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_3_.28MD5_hash.29
 **/
function uuid3(message) {
    if (typeof message === "undefined") { message = 'not-valid-uuid3'; }
    return exports.match("^[a-f0-9]{8}\-[a-f0-9]{4}\-3[a-f0-9]{3}\-[89ab][a-f0-9]{3}\-[a-f0-9]{12}$", "i", message);
}
exports.uuid3 = uuid3;

/**
 * Check if it's a valid UUID version 4 (random).
 * http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29
 **/
function uuid4(message) {
    if (typeof message === "undefined") { message = 'not-valid-uuid4'; }
    return exports.match("^[a-f0-9]{8}\-[a-f0-9]{4}\-4[a-f0-9]{3}\-[89ab][a-f0-9]{3}\-[a-f0-9]{12}$", "i", message);
}
exports.uuid4 = uuid4;
