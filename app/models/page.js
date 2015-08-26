"use strict";

module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define("page", {
    //id:{type: DataTypes.INTEGER, autoIncrement: true},
    org_id: DataTypes.STRING,
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    keywords: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    content_html: DataTypes.TEXT,
    content: DataTypes.TEXT
  });

  return Page;
};

