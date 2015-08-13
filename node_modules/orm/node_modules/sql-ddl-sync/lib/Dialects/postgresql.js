var util        = require("util");
var SQL         = require("../SQL");
var Queue       = require("../Queue").Queue;
var columnSizes = {
	integer:  { 2: 'SMALLINT', 4: 'INTEGER', 8: 'BIGINT' },
	floating: {                4: 'REAL',    8: 'DOUBLE PRECISION' }
};

exports.hasCollection = function (driver, name, cb) {
	driver.execQuery("SELECT * FROM information_schema.tables WHERE table_name = ?", [ name ], function (err, rows) {
		if (err) return cb(err);

		return cb(null, rows.length > 0);
	});
};

exports.getCollectionProperties = function (driver, name, cb) {
	driver.execQuery("SELECT * FROM information_schema.columns WHERE table_name = ?", [ name ], function (err, cols) {
		if (err) return cb(err);

		var columns = {}, m;

		for (var i = 0; i < cols.length; i++) {
			var column = {};
			var dCol = cols[i];

			if (dCol.is_nullable.toUpperCase() == "NO") {
				column.required = true;
			}
			if (dCol.column_default !== null) {
				m = dCol.column_default.match(/^'(.+)'::/);
				if (m) {
					column.defaultValue = m[1];
				} else {
					column.defaultValue = dCol.column_default;
				}
			}

			switch (dCol.data_type.toUpperCase()) {
				case "SMALLINT":
				case "INTEGER":
				case "BIGINT":
					if (typeof dCol.column_default == 'string' && dCol.column_default.indexOf('nextval(') == 0) {
						column.type = "serial";
					} else {
						column.type = "integer";
					}
					for (var k in columnSizes.integer) {
						if (columnSizes.integer[k] == dCol.data_type.toUpperCase()) {
							column.size = k;
							break;
						}
					}
					break;
				case "REAL":
				case "DOUBLE PRECISION":
					column.type = "number";
					column.rational = true;
					for (var k in columnSizes.floating) {
						if (columnSizes.floating[k] == dCol.data_type.toUpperCase()) {
							column.size = k;
							break;
						}
					}
					break;
				case "BOOLEAN":
					column.type = "boolean";
					break;
				case "TIMESTAMP WITHOUT TIME ZONE":
					column.time = true;
				case "DATE":
					column.type = "date";
					break;
				case "BYTEA":
					column.type = "binary";
					break;
				case "TEXT":
					column.type = "text";
					break;
				case "CHARACTER VARYING":
					column.type = "text";
					if (dCol.character_maximum_length) {
						column.size = dCol.character_maximum_length;
					}
					break;
				case "USER-DEFINED":
					if (dCol.udt_name.match(/_enum_/)) {
						column.type = "enum";
						column.values = [];
						break;
					}
				default:
					return cb(new Error("Unknown column type '" + dCol.data_type + "'"));
			}

			columns[dCol.column_name] = column;
		}

		return checkColumnTypes(driver, name, columns, cb);
	});
};

exports.createCollection = function (driver, name, columns, keys, cb) {
	return driver.execQuery(SQL.CREATE_TABLE({
		driver  : driver,
		name    : name,
		columns : columns,
		keys    : keys
	}, driver), cb);
};

exports.dropCollection = function (driver, name, cb) {
	return driver.execQuery(SQL.DROP_TABLE({
		driver  : driver,
		name    : name
	}, driver), cb);
};

exports.addPrimaryKey = function(driver, tableName, columnName, cb){
	var sql = "ALTER TABLE ?? ADD CONSTRAINT ?? PRIMARY KEY(??);"
	return driver.execQuery(sql, [tableName, tableName + "_" + columnName + "_pk", columnName], cb);
};

exports.dropPrimaryKey = function(driver, tableName, columnName, cb){
	var sql = "ALTER TABLE ?? DROP CONSTRAINT ??;"
	return driver.execQuery(sql, [tableName, tableName + "_" + columnName + "_pk"], cb);
};

exports.addForeignKey = function(driver, tableName, options, cb){
	var sql = "ALTER TABLE ?? ADD FOREIGN KEY(??) REFERENCES ?? (??);"
	return driver.execQuery(sql, [tableName, options.name, options.references.table, options.references.column], cb);
};

exports.dropForeignKey = function(driver, tableName, columnName, cb){
	var sql = "ALTER TABLE ?? DROP CONSTRAINT ??;";
	return driver.execQuery(sql, [tableName, tableName + '_' + columnName + '_fkey'], cb);
};

//exports.renameTable =  function(driver, oldCollectionName, newCollectionName, cb) {
//  return driver.execQuery(SQL.RENAME_TABLE({
//    oldCollectionName : oldCollectionName,
//    newCollectionName : newCollectionName
//  }, driver), cb);
//}

exports.addCollectionColumn = function (driver, name, column, afterColumn, cb) {
	var sql = "ALTER TABLE ?? ADD " + column + ";";
	return driver.execQuery(sql, [name] , cb);
};

exports.renameCollectionColumn = function (driver, name, oldColName, newColName, cb) {
	var sql = SQL.ALTER_TABLE_RENAME_COLUMN({
		name: name, oldColName: oldColName, newColName: newColName
	}, driver);

	return driver.execQuery(sql , cb);
};

exports.modifyCollectionColumn = function (driver, name, column, cb) {
	var p        = column.indexOf(" ");
	var col_name = column.substr(0, p);
	var queue    = new Queue(cb);
	var col_type, m;

	column = column.substr(p + 1);

	p = column.indexOf(" ");
	if (p > 0) {
		col_type = column.substr(0, p);
		column = column.substr(p + 1);
	} else {
		col_type = column;
		column = false;
	}

	queue.add(function (next) {
		return driver.execQuery("ALTER TABLE " + name +
		                " ALTER " + col_name +
		                " TYPE " + col_type, next);
	});

	if (column) {
		if (column.match(/NOT NULL/)) {
			queue.add(function (next) {
				return driver.execQuery("ALTER TABLE " + name +
				                " ALTER " + col_name +
				                " SET NOT NULL", next);
			});
		} else {
			queue.add(function (next) {
				return driver.execQuery("ALTER TABLE " + name +
				                " ALTER " + col_name +
				                " DROP NOT NULL", next);
			});
		}

		if (m = column.match(/DEFAULT (.+)$/)) {
			queue.add(function (next) {
				return driver.execQuery("ALTER TABLE " + name +
				                " ALTER " + col_name +
				                " SET DEFAULT " + m[1], next);
			});
		}
	}

	return queue.check();
};

exports.dropCollectionColumn = function (driver, name, column, cb) {
	return driver.execQuery(SQL.ALTER_TABLE_DROP_COLUMN({
		driver     : driver,
		name        : name,
		column      : column
	}, driver), cb);
};

exports.getCollectionIndexes = function (driver, name, cb) {
	driver.execQuery("SELECT t.relname, i.relname, a.attname, ix.indisunique, ix.indisprimary " +
	         "FROM pg_class t, pg_class i, pg_index ix, pg_attribute a " +
	         "WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid " +
	         "AND a.attrelid = t.oid AND a.attnum = ANY(ix.indkey) " +
	         "AND t.relkind = 'r' AND t.relname = ?",
	         [ name ],
	function (err, rows) {
		if (err) return cb(err);

		return cb(null, convertIndexRows(rows));
	});
};

exports.addIndex = function (driver, name, unique, collection, columns, cb) {
	return driver.execQuery(SQL.CREATE_INDEX({
		driver     : driver,
		name       : name,
		unique     : unique,
		collection : collection,
		columns    : columns
	}, driver), cb);
};

exports.removeIndex = function (driver, collection, name, cb) {
	return driver.execQuery("DROP INDEX " + driver.query.escapeId(name), cb);
};

exports.convertIndexes = function (collection, indexes) {
	for (var i = 0; i < indexes.length; i++) {
		indexes[i].name = collection.name + "_" + indexes[i].name;
	}

	return indexes;
};

exports.getType = function (collection, property, driver) {
	var type   = false;
	var before = false;
	var customType = null;

	if (property.type == 'number' && property.rational === false) {
		property.type = 'integer';
		delete property.rational;
	}

	if (property.serial) {
		type = "SERIAL";
	} else {
		switch (property.type) {
			case "text":
				type = "TEXT";
				break;
			case "integer":
				type = columnSizes.integer[property.size || 4];
				break;
			case "number":
				type = columnSizes.floating[property.size || 4];
				break;
			case "serial":
				property.serial = true;
				property.key = true;
				type = "SERIAL";
				break;
			case "boolean":
				type = "BOOLEAN";
				break;
			case "date":
				if (!property.time) {
					type = "DATE";
				} else {
					type = "TIMESTAMP WITHOUT TIME ZONE";
				}
				break;
			case "binary":
			case "object":
				type = "BYTEA";
				break;
			case "enum":
				type   = collection + "_enum_" + property.mapsTo.toLowerCase();
				before = function (driver, cb) {
					var type = collection + "_enum_" + property.mapsTo.toLowerCase();

					driver.execQuery("SELECT * FROM pg_catalog.pg_type WHERE typname = ?", [ type ], function (err, rows) {
						if (!err && rows.length) {
							return cb();
						}

						var values = property.values.map(function (val) {
							return driver.query.escapeVal(val);
						});

						return driver.execQuery("CREATE TYPE " + type + " " +
						                "AS ENUM (" + values + ")", cb);
					});
				};

				// return {
				// 	value  : type,
				// 	before : before
				// };
				break;
			case "point":
				type = "POINT";
				break;
			default:
				customType = driver.customTypes[property.type];
				if (customType) {
					type = customType.datastoreType()
				}
		}

		if (!type) return false;

		if (property.required) {
			type += " NOT NULL";
		}
		if (property.hasOwnProperty("defaultValue")) {
			if (property.type == 'date' && property.defaultValue === Date.now ){
				type += " DEFAULT now()";
			} else {
				type += " DEFAULT " + driver.query.escapeVal(property.defaultValue);
			}
		}
	}

	return {
		value  : type,
		before : before
	};
};

function convertIndexRows(rows) {
	var indexes = {};

	for (var i = 0; i < rows.length; i++) {
		if (rows[i].indisprimary) {
			continue;
		}

		if (!indexes.hasOwnProperty(rows[i].relname)) {
			indexes[rows[i].relname] = {
				columns : [],
				unique  : rows[i].indisunique
			};
		}

		indexes[rows[i].relname].columns.push(rows[i].attname);
	}

	return indexes;
}

function checkColumnTypes(driver, collection, columns, cb) {
	var queue = new Queue(function () {
		return cb(null, columns);
	});

	for (var k in columns) {
		if (columns[k].type == "enum") {
			queue.add(k, columns[k], function (name, col, next) {
				var col_name = collection + "_enum_" + name;

				driver.execQuery("SELECT t.typname, string_agg(e.enumlabel, '|' ORDER BY e.enumsortorder) AS enum_values " +
				         "FROM pg_catalog.pg_type t JOIN pg_catalog.pg_enum e ON t.oid = e.enumtypid  " +
				         "WHERE t.typname = ? GROUP BY 1", [ col_name ],
				function (err, rows) {
					if (err) {
						return next(err);
					}
					if (rows.length) {
						col.values = rows[0].enum_values.split("|");
					}

					return next();
				});
			});
		}
	}

	return queue.check();
}

function dateToString(date, timeZone) {
	var dt = new Date(date);

	if (timeZone != 'local') {
		var tz = convertTimezone(timeZone);

		dt.setTime(dt.getTime() + (dt.getTimezoneOffset() * 60000));
		if (tz !== false) {
			dt.setTime(dt.getTime() + (tz * 60000));
		}
	}

	var year   = dt.getFullYear();
	var month  = zeroPad(dt.getMonth() + 1);
	var day    = zeroPad(dt.getDate());
	var hour   = zeroPad(dt.getHours());
	var minute = zeroPad(dt.getMinutes());
	var second = zeroPad(dt.getSeconds());
	var milli  = zeroPad(dt.getMilliseconds(), 3);

	return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + '.' + milli + 'Z';
}

function zeroPad(number, n) {
	if (arguments.length == 1) n = 2;

	number = "" + number;

	while (number.length < n) {
		number = "0" + number;
	}
	return number;
}

function convertTimezone(tz) {
	if (tz == "Z") return 0;

	var m = tz.match(/([\+\-\s])(\d\d):?(\d\d)?/);
	if (m) {
		return (m[1] == '-' ? -1 : 1) * (parseInt(m[2], 10) + ((m[3] ? parseInt(m[3], 10) : 0) / 60)) * 60;
	}
	return false;
}
