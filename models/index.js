const User = require('./User');
const Comment = require('./Comment');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

BlogPost.hasMany(Comment,{
  foreignKey: 'blogPost_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, BlogPost, Comment };