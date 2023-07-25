const {sequelize, DataTypes} = require('sequelize');
const database = require('../config/database');
const User = require('./User');

const BlogPost = database.define('BlogPost', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
BlogPost.belongsTo(User, {foreignKey: 'userId', allowNull: false});
BlogPost.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });

module.exports = BlogPost;