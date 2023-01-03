const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//one to many - one user has many blog posts
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//one to many - one blog has many comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Blog, Comment };
