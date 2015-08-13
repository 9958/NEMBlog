## NodeJS SQL DDL Synchronization

[![Build Status](https://secure.travis-ci.org/dresende/node-sql-ddl-sync.png?branch=master)](http://travis-ci.org/dresende/node-sql-ddl-sync)
[![](https://badge.fury.io/js/sql-ddl-sync.png)](https://npmjs.org/package/sql-ddl-sync)
[![](https://gemnasium.com/dresende/node-sql-ddl-sync.png)](https://gemnasium.com/dresende/node-sql-ddl-sync)

## Install

```sh
npm install sql-ddl-sync
```

## Dialects

- MySQL
- PostgreSQL

## About

This module is part of [ORM](http://dresende.github.com/node-orm2). It's used synchronize model tables in supported dialects.
Sorry there is no API documentation for now but there are a couple of tests you can read and find out how to use it if you want.

## Example

Install `orm` & the required driver (eg: `mysql`).
Create a file with the contents below and change insert your database credentials.
Run once and you'll see table `ddl_sync_test` appear in your database. Then make some changes to it (add/drop/change columns)
and run the code again. Your table should always return to the same structure.

```js
var orm    = require("orm");
var mysql  = require("mysql");
var Sync   = require("sql-ddl-sync").Sync;

orm.connect("mysql://username:password@localhost/database", function (err, db) {
	if (err) throw err;
	var driver = db.driver;

	var sync = new Sync({
		dialect : "mysql",
		driver  : driver,
		debug   : function (text) {
			console.log("> %s", text);
		}
	});

	sync.defineCollection("ddl_sync_test", {
    id     : { type: "serial", key: true, serial: true },
    name   : { type: "text", required: true },
    age    : { type: "integer" },
    male   : { type: "boolean" },
    born   : { type: "date", time: true },
    born2  : { type: "date" },
    int2   : { type: "integer", size: 2 },
    int4   : { type: "integer", size: 4 },
    int8   : { type: "integer", size: 8 },
    float4 : { type: "number",  size: 4 },
    float8 : { type: "number",  size: 8 },
    photo  : { type: "binary" }
  });

	sync.sync(function (err) {
		if (err) {
			console.log("> Sync Error");
			console.log(err);
		} else {
			console.log("> Sync Done");
		}
		process.exit(0);
	});
});

```

## Test

To test, first make sure you have development dependencies installed. Go to the root folder and do:

```sh
npm install
```

Then, just run the tests.

```sh
npm test
```

If you have a supported database server and want to test against it, first install the module:

```sh
# if you have a mysql server
npm install mysql
# if you have a postgresql server
npm install pg
```

And then run:

```sh
node test/run-db --uri 'mysql://username:password@localhost/database'
```
