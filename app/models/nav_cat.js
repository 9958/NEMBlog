"use strict";

module.exports = function(sequelize, DataTypes) {
  var Nav_cat = sequelize.define("nav_cat", {
    //id:{type: DataTypes.INTEGER, autoIncrement: true},
    status: DataTypes.INTEGER,
    name: DataTypes.STRING,
    parentid: DataTypes.INTEGER,
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Nav_cat;
};

