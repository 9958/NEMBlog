"use strict";

module.exports = function(sequelize, DataTypes) {
  var Nav_list = sequelize.define("nav_list", {
    //id:{type: DataTypes.INTEGER, autoIncrement: true},
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
    content: DataTypes.STRING,
    cat_id: DataTypes.INTEGER,
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Nav_list;
};

