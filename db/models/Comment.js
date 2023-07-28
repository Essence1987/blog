const {Sequelize, DataTypes} = require('sequelize');
const database = require('../../config/database');
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

module.exports = Comment;