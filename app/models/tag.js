"use strict";

module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define("tag", {
    //id:{type: DataTypes.INTEGER, autoIncrement: true},
    title: {type: DataTypes.STRING,unique: 'titleIndex'},
    status: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Tag;
};

