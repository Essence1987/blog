'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('BlogPosts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_blogposts_userid',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_comments_userid',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['blogPostId'],
      type: 'foreign key',
      name: 'fk_comments_blogpostid',
      references: {
        table: 'BlogPosts',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('BlogPosts', 'fk_blogposts_userid');
    await queryInterface.removeConstraint('Comments', 'fk_comments_userid');
    await queryInterface.removeConstraint('Comments', 'fk_comments_blogpostid');
  },
};
