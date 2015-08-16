var moment = require('moment');

module.exports = function (orm, db) {
  var Post = db.define('post', {
    id : {type : 'serial', key : true},
    org_id : {type: 'text', size : 50},
    slug : {type : 'text', size : 60},
    tag : {type : 'text', size : 100},
    keywords : {type : 'text', size : 160},
    description : {type : 'text', size : 255},
    status : {type: 'integer', size : 2},
    content_html : { type: 'text', required : true},
    content      : { type: 'text', required : true},
    created : { type: 'date', required : true, time : true }
  },
  {
    hooks: {
      beforeValidation: function () {
        this.created = new Date();
      }
    },
    validations: {
      description   : orm.enforce.ranges.length(1, 255)
    },
    methods: {
      serialize: function () {
        return {
          id : this.id,
          org_id : this.org_id,
          slug : this.slug,
          tag : this.tag,
          keywords : this.keywords,
          description : this.description,
          status : this.status,
          content_html : this.content_html,
          content      : this.content,
          created : moment(this.created).fromNow()
        }
      }
    }
  });

  Comment.hasOne('message', db.models.message, { required: true, reverse: 'comments', autoFetch: true });
};
