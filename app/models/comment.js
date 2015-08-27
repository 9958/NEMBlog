"use strict";

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("comment", {
    //id:{type: DataTypes.INTEGER, autoIncrement: true},
    post_slug: DataTypes.STRING,
    author: DataTypes.STRING,
    email: DataTypes.STRING,
    url: DataTypes.STRING,
    ip: DataTypes.STRING,
    status: DataTypes.INTEGER,
    content: DataTypes.STRING,
    post_id: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Comment;
};

