const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const User = require('../db/models/User');
const BlogPost = require('../db/models/BlogPost');
const Comment = require('../db/models/Comment');

// Define associations
function setupAssociations() {
  BlogPost.belongsTo(User, { foreignKey: 'userId', allowNull: false });
  BlogPost.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });

  Comment.belongsTo(User, { foreignKey: 'userId', allowNull: false });
  Comment.belongsTo(BlogPost, { foreignKey: 'blogPostId', allowNull: false });

  User.hasMany(BlogPost, { onDelete: 'CASCADE', hooks: true });
  User.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });
}

module.exports = {
  sequelize,
  setupAssociations,
};
