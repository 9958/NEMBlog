"use strict";

module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define("admin", {
    //id:{type: DataTypes.INTEGER, autoIncrement: true},
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return Admin;
};

