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
    status: DataTypes.INTEGER,// 1:正常，0:草稿 －1:删除
    clicknum: DataTypes.INTEGER,
    content_html: DataTypes.TEXT,
    content: DataTypes.TEXT,
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Post;
};

