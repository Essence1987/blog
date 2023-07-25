'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('BlogPosts', [
      {
        title: 'Sample Blog Post 1',
        contents: 'This is the content of the first blog post.',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, // Replace with the corresponding user ID from the Users table
      },
      // Add more blog post data as needed...
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('BlogPosts', null, {});
  },
};
