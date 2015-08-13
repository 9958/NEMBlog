exports.dialect = null;
exports.table   = "sql_ddl_sync_test_table";

exports.fakeDriver = {
	query: {
		escapeId  : function (id) {
			return "$$" + id + "$$";
		},
		escapeVal : function (val) {
			return "^^" + val + "^^";
		}
	},
	customTypes: {
		json: {
			datastoreType: function (prop) {
				return 'JSON';
			}
		}
	}
};

exports.dropColumn = function (column) {
	return function (done) {
		switch (exports.driver.dialect) {
			case "mysql":
			case "postgresql":
				return exports.driver.execQuery("ALTER TABLE ?? DROP ??", [ exports.table, column ], done);
		}
		return done(unknownProtocol());
	};
};

exports.addColumn = function (column) {
	return function (done) {
		switch (exports.driver.dialect) {
			case "mysql":
				return exports.driver.execQuery("ALTER TABLE ?? ADD ?? INTEGER NOT NULL", [ exports.table, column ], done);
			case "postgresql":
				return exports.driver.execQuery("ALTER TABLE " + exports.table + " ADD " + column + " INTEGER NOT NULL", done);
			case "sqlite":
				return exports.driver.execQuery("ALTER TABLE " + exports.table + " ADD " + column + " INTEGER", done);
		}
		return done(unknownProtocol());
	};
};

exports.changeColumn = function (column) {
	return function (done) {
		switch (exports.driver.dialect) {
			case "mysql":
				return exports.driver.execQuery("ALTER TABLE ?? MODIFY ?? INTEGER NOT NULL", [ exports.table, column ], done);
			case "postgresql":
				return exports.driver.execQuery("ALTER TABLE " + exports.table + " ALTER " + column + " TYPE DOUBLE PRECISION", done);
			case "sqlite":
				return exports.driver.execQuery("ALTER TABLE " + exports.table + " MODIFY " + column + " INTEGER NOT NULL", done);
		}
		return done(unknownProtocol());
	};
};

exports.addIndex = function (name, column, unique) {
	return function (done) {
		switch (exports.driver.dialect) {
			case "mysql":
				return exports.driver.execQuery("CREATE " + (unique ? "UNIQUE" : "") + " INDEX ?? ON ?? (??)", [ name, exports.table, column ], done);
			case "postgresql":
				return exports.driver.execQuery("CREATE " + (unique ? "UNIQUE" : "") + " INDEX " + exports.table + "_" + name + " ON " + exports.table + " (" + column + ")", done);
			case "sqlite":
				return exports.driver.execQuery("CREATE " + (unique ? "UNIQUE" : "") + " INDEX " + name + " ON " + exports.table + " (" + column + ")", done);
		}
		return done(unknownProtocol());
	};
};

exports.dropIndex = function (name) {
	return function (done) {
		switch (exports.driver.dialect) {
			case "mysql":
				return exports.driver.execQuery("DROP INDEX ?? ON ??", [ name, exports.table ], done);
			case "postgresql":
				return exports.driver.execQuery("DROP INDEX " + exports.table + "_" + name, done);
			case "sqlite":
				return exports.driver.execQuery("DROP INDEX " + name, done);
		}
		return done(unknownProtocol());
	};
};

exports.dropTable = function (name) {
	return function (done) {
		exports.driver.execQuery("DROP TABLE IF EXISTS ??", [exports.table], done);
	};
}

function unknownProtocol() {
	return new Error("Unknown protocol - " + exports.driver.dialect);
}
