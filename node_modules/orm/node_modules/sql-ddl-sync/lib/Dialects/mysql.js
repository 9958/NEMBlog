var SQL  = require("../SQL");
var util = require("util");

var columnSizes = {
	integer:  { 2: 'SMALLINT', 4: 'INTEGER', 8: 'BIGINT' },
	floating: {                4: 'FLOAT',   8: 'DOUBLE' }
};

exports.hasCollection = function (driver, name, cb) {
	driver.execQuery("SHOW TABLES LIKE ?", [ name ], function (err, rows) {
		if (err) return cb(err);

		return cb(null, rows.length > 0);
	});
};

exports.addPrimaryKey = function(driver, tableName, columnName, cb){
  var sql = "ALTER TABLE ?? ADD CONSTRAINT ?? PRIMARY KEY(??);"
  return driver.execQuery(sql, [tableName, columnName + "PK", columnName] , cb);
};

exports.dropPrimaryKey = function(driver, tableName, columnName, cb){
  var sql = "ALTER TABLE ?? DROP PRIMARY KEY;";
  return driver.execQuery(sql, [tableName], cb);
};

exports.addForeignKey = function(driver, tableName, options, cb){
  var sql = " ALTER TABLE ?? ADD CONSTRAINT ?? FOREIGN KEY(??) REFERENCES ??(??)";
  return driver.execQuery(sql, [tableName, options.name + "_fk", options.name, options.references.table, options.references.column], cb);
};

exports.dropForeignKey = function(driver, tableName, columnName, cb){
  var sql = "ALTER TABLE " + tableName + " DROP FOREIGN KEY "+ columnName + "_fk;";
  return driver.execQuery(sql, [tableName, columnName + '_fk'], cb);
};

exports.getCollectionProperties = function (driver, name, cb) {
	driver.execQuery("SHOW COLUMNS FROM ??", [ name ], function (err, cols) {
		if (err) return cb(err);

		var columns = {}, m;

		for (var i = 0; i < cols.length; i++) {
			var column = {};

			if (cols[i].Type.indexOf(" ") > 0) {
				cols[i].SubType = cols[i].Type.substr(cols[i].Type.indexOf(" ") + 1).split(/\s+/);
				cols[i].Type = cols[i].Type.substr(0, cols[i].Type.indexOf(" "));
			}

			m = cols[i].Type.match(/^(.+)\((\d+)\)$/);
			if (m) {
				cols[i].Size = parseInt(m[2], 10);
				cols[i].Type = m[1];
			}

			if (cols[i].Extra.toUpperCase() == "AUTO_INCREMENT") {
				column.serial = true;
				column.unsigned = true;
			}

			if (cols[i].Key == "PRI") {
				column.primary = true;
			}

			if (cols[i].Null.toUpperCase() == "NO") {
				column.required = true;
			}
			if (cols[i].Default !== null) {
				column.defaultValue = cols[i].Default;
			}

			switch (cols[i].Type.toUpperCase()) {
				case "SMALLINT":
				case "INTEGER":
				case "BIGINT":
				case "INT":
					column.type = "integer";
					column.size = 4; // INT
					for (var k in columnSizes.integer) {
						if (columnSizes.integer[k] == cols[i].Type.toUpperCase()) {
							column.size = k;
							break;
						}
					}
					break;
				case "FLOAT":
				case "DOUBLE":
					column.type = "number";
					column.rational = true;
					for (var k in columnSizes.floating) {
						if (columnSizes.floating[k] == cols[i].Type.toUpperCase()) {
							column.size = k;
							break;
						}
					}
					break;
				case "TINYINT":
					if (cols[i].Size == 1) {
						column.type = "boolean";
					} else {
						column.type = "integer";
					}
					break;
				case "DATETIME":
					column.time = true;
				case "DATE":
					column.type = "date";
					break;
				case "LONGBLOB":
					column.big = true;
				case "BLOB":
					column.type = "binary";
					break;
				case "VARCHAR":
					column.type = "text";
					if (cols[i].Size) {
						column.size = cols[i].Size;
					}
					break;
				default:
					m = cols[i].Type.match(/^enum\('(.+)'\)$/);
					if (m) {
						column.type = "enum";
						column.values = m[1].split(/'\s*,\s*'/);
						break;
					}
					return cb(new Error("Unknown column type '" + cols[i].Type + "'"));
			}

			if (column.serial) {
				column.type = "serial";
			}

			columns[cols[i].Field] = column;
		}

		return cb(null, columns);
	});
};

exports.createCollection = function (driver, name, columns, keys, cb) {
	return driver.execQuery(SQL.CREATE_TABLE({
		name    : name,
		columns : columns,
		keys    : keys
	}, driver), cb);
};

exports.dropCollection = function (driver, name, cb) {
	return driver.execQuery(SQL.DROP_TABLE({
		name    : name
	}, driver), cb);
};

exports.addCollectionColumn = function (driver, name, column, after_column, cb) {
	return driver.execQuery(SQL.ALTER_TABLE_ADD_COLUMN({
		name   : name,
		column : column,
		after  : after_column,
		first  : !after_column
	}, driver), cb);
};

exports.renameCollectionColumn = function (driver, name, oldColName, newColName, cb) {
	return cb("MySQL doesn't support simple column rename");
};

exports.modifyCollectionColumn = function (driver, name, column, cb) {
	return driver.execQuery(SQL.ALTER_TABLE_MODIFY_COLUMN({
		name        : name,
		column      : column
	}, driver), cb);
};

exports.dropCollectionColumn = function (driver, name, column, cb) {
	return driver.execQuery(SQL.ALTER_TABLE_DROP_COLUMN({
		name        : name,
		column      : column
	}, driver), cb);
};

exports.getCollectionIndexes = function (driver, name, cb) {
	var q = "";
	q += "SELECT index_name, column_name, non_unique ";
	q += "FROM information_schema.statistics ";
	q += "WHERE table_schema = ? AND table_name = ?";

	driver.execQuery(q, [driver.config.database, name], function (err, rows) {
		if (err) return cb(err);

		return cb(null, convertIndexRows(rows));
	});
};

exports.addIndex = function (driver, indexName, unique, collection, columns, cb) {
	return driver.execQuery(SQL.CREATE_INDEX({
		name       : indexName,
		unique     : unique,
		collection : collection,
		columns    : columns
	}, driver), cb);
};

exports.removeIndex = function (driver, collection, name, cb) {
	return driver.execQuery(SQL.DROP_INDEX({
		name       : name,
		collection : collection
	}, driver), cb);
};

exports.getType = function (collection, property, driver) {
	var type       = false;
	var customType = null;

	if (property.type == 'number' && property.rational === false) {
		property.type = 'integer';
		delete property.rational;
	}

	switch (property.type) {
		case "text":
			if (property.big) {
				type = "LONGTEXT";
			} else {
				type = "VARCHAR(" + Math.min(Math.max(parseInt(property.size, 10) || 255, 1), 65535) + ")";
			}
			break;
		case "integer":
			type = columnSizes.integer[property.size || 4];
			break;
		case "number":
			type = columnSizes.floating[property.size || 4];
			break;
		case "serial":
			property.type = "number";
			property.serial = true;
			property.key = true;
			type = "INT(11)";
			break;
		case "boolean":
			type = "TINYINT(1)";
			break;
		case "date":
			if (!property.time) {
				type = "DATE";
			} else {
				type = "DATETIME";
			}
			break;
		case "binary":
		case "object":
			if (property.big === true) {
				type = "LONGBLOB";
			} else {
				type = "BLOB";
			}
			break;
		case "enum":
			type = "ENUM (" + property.values.map(driver.query.escapeVal) + ")";
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
	if (property.serial) {
		if (!property.required) {
			// append if not set
			type += " NOT NULL";
		}
		type += " AUTO_INCREMENT";
	}
	if (property.hasOwnProperty("defaultValue")) {
		type += " DEFAULT " + driver.query.escapeVal(property.defaultValue);
	}

	return {
		value  : type,
		before : false
	};
};

function convertIndexRows(rows) {
	var indexes = {};

	for (var i = 0; i < rows.length; i++) {
		if (rows[i].index_name == 'PRIMARY') {
			continue;
		}
		if (!indexes.hasOwnProperty(rows[i].index_name)) {
			indexes[rows[i].index_name] = {
				columns : [],
				unique  : (rows[i].non_unique == 0)
			};
		}

		indexes[rows[i].index_name].columns.push(rows[i].column_name);
	}

	return indexes;
}

function bufferToString(buffer) {
	var hex = '';

	try {
		hex = buffer.toString('hex');
	} catch (err) {
		// node v0.4.x does not support hex / throws unknown encoding error
		for (var i = 0; i < buffer.length; i++) {
			var b = buffer[i];
			hex += zeroPad(b.toString(16));
		}
	}

	return "X'" + hex+ "'";
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

	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

function zeroPad(number) {
	return (number < 10) ? '0' + number : number;
}

function convertTimezone(tz) {
	if (tz == "Z") return 0;

	var m = tz.match(/([\+\-\s])(\d\d):?(\d\d)?/);
	if (m) {
		return (m[1] == '-' ? -1 : 1) * (parseInt(m[2], 10) + ((m[3] ? parseInt(m[3], 10) : 0) / 60)) * 60;
	}
	return false;
}
