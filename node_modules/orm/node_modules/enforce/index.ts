/// <reference path="lib/node.d.ts" />
/// <reference path="lib/enforce.d.ts" />
/// <reference path="lib/enforcements/common.ts" />
/// <reference path="lib/enforcements/lists.ts" />
/// <reference path="lib/enforcements/ranges.ts" />
/// <reference path="lib/enforcements/patterns.ts" />
/// <reference path="lib/enforcements/security.ts" />

import common = require('lib/enforcements/common');
export import Enforce = require('lib/enforce');
export import Validator = require('lib/validator');
export import lists = require('lib/enforcements/lists');
export import ranges = require('lib/enforcements/ranges');
export import patterns = require('lib/enforcements/patterns');
export import security = require('lib/enforcements/security');

//Force TypeScript compiler to output our inputs (otherwise it optimizes them away)
Enforce.hasOwnProperty('x');
Validator.hasOwnProperty('x');
lists.hasOwnProperty('x');
ranges.hasOwnProperty('x');
patterns.hasOwnProperty('x');
security.hasOwnProperty('x');

for (var k in common) {
    exports[k] = common[k];
}
