/// <reference path="lib/node.d.ts" />
/// <reference path="lib/enforce.d.ts" />
/// <reference path="lib/enforcements/common.ts" />
/// <reference path="lib/enforcements/lists.ts" />
/// <reference path="lib/enforcements/ranges.ts" />
/// <reference path="lib/enforcements/patterns.ts" />
/// <reference path="lib/enforcements/security.ts" />
var common = require("./lib/enforcements/common");
var Enforce = require("./lib/enforce");
exports.Enforce = Enforce;
var Validator = require("./lib/validator");
exports.Validator = Validator;
var lists = require("./lib/enforcements/lists");
exports.lists = lists;
var ranges = require("./lib/enforcements/ranges");
exports.ranges = ranges;
var patterns = require("./lib/enforcements/patterns");
exports.patterns = patterns;
var security = require("./lib/enforcements/security");
exports.security = security;

//Force TypeScript compiler to output our inputs (otherwise it optimizes them away)
exports.Enforce.hasOwnProperty('x');
exports.Validator.hasOwnProperty('x');
exports.lists.hasOwnProperty('x');
exports.ranges.hasOwnProperty('x');
exports.patterns.hasOwnProperty('x');
exports.security.hasOwnProperty('x');

for (var k in common) {
    exports[k] = common[k];
}

