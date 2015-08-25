"use strict";

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("post", {
    //id:{type: DataTypes.INTEGER, autoIncrement: true},
    org_id: DataTypes.STRING,
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    tags: DataTypes.STRING,
    keywords: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    clicknum: DataTypes.INTEGER,
    content_html: DataTypes.TEXT,
    content: DataTypes.TEXT
  });

  return Post;
};

