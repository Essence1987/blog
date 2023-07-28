const {sequelize, DataTypes} = require('sequelize');
const database = require('../../config/database');
const User = require('./User');
const Comment = require('./Comment');

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

module.exports = BlogPost;