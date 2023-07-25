const {Sequelize, DataTypes} = require('sequelize');
const database = require('../config/database');
const User = require('./User');
const BlogPost = require('./BlogPost');

const Comment = database.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

// Define associations
Comment.belongsTo(User, {foreignKey: 'userId', allowNull: false});
Comment.belongsTo(BlogPost, {foreignKey: 'blogPostId', allowNull: false});
User.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });
BlogPost.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });

module.exports = Comment;