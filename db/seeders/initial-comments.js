'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        text: 'This is a comment on the first blog post.',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, // Replace with the corresponding user ID from the Users table
        blogPostId: 1, // Replace with the corresponding blog post ID from the BlogPosts table
      },
      // Add more comment data as needed...
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
