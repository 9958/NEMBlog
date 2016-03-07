"use strict";

module.exports = function(sequelize, DataTypes) {
  var Tag_log = sequelize.define("tag_log", {
    //id:{type: DataTypes.INTEGER, autoIncrement: true},
    last_post_id: DataTypes.INTEGER,
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Tag_log;
};

