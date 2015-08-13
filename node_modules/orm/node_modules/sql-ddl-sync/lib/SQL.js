exports.CREATE_TABLE = function (options, driver) {
	var sql = "CREATE TABLE " + driver.query.escapeId(options.name) + " (" + options.columns.join(", ");

	if (options.keys && options.keys.length > 0) {
		sql += ", PRIMARY KEY (" + options.keys.map(function (val) {
			return driver.query.escapeId(val);
		}).join(", ") + ")";
	}

	sql += ")";

	return sql;
};

exports.DROP_TABLE = function (options, driver) {
	var sql = "DROP TABLE " + driver.query.escapeId(options.name);

	return sql;
};

exports.ALTER_TABLE_ADD_COLUMN = function (options, driver) {
	var sql = "ALTER TABLE " + driver.query.escapeId(options.name) +
	          " ADD " + options.column;

	if (options.after) {
		sql += " AFTER " + driver.query.escapeId(options.after);
	} else if (options.first) {
		sql += " FIRST";
	}

	return sql;
};

exports.ALTER_TABLE_RENAME_COLUMN = function (opts, driver) {
	var eid = driver.query.escapeId;
	var sql = "ALTER TABLE "	+ eid(opts.name) +
	          " RENAME COLUMN " + eid(opts.oldColName) + " TO " + eid(opts.newColName);

  return sql;
}

exports.ALTER_TABLE_MODIFY_COLUMN = function (options, driver) {
	var sql = "ALTER TABLE " + driver.query.escapeId(options.name) +
	          " MODIFY " + options.column;

	return sql;
};

exports.ALTER_TABLE_DROP_COLUMN = function (options, driver) {
	var sql = "ALTER TABLE " + driver.query.escapeId(options.name) +
	          " DROP " + driver.query.escapeId(options.column);

	return sql;
};

exports.CREATE_INDEX = function (options, driver) {
	var sql = "CREATE" + (options.unique ? " UNIQUE" : "") + " INDEX " + driver.query.escapeId(options.name) +
	          " ON " + driver.query.escapeId(options.collection) +
	          " (" + options.columns.map(function (col) { return driver.query.escapeId(col); }) + ")";

	return sql;
};

exports.DROP_INDEX = function (options, driver) {
	var sql = "DROP INDEX " + driver.query.escapeId(options.name) +
	          " ON " + driver.query.escapeId(options.collection);

	return sql;
};

//exports.RENAME_TABLE = function(options, driver) {
//  var sql = "ALTER TABLE " + options.oldCollectionName + " RENAME TO " + options.newCollectionName + " ;";
//}
