'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Users', [
    {
      firstName: 'Rick',
      lastName: 'Sanchez',
      email: 'rick.sanchez@example.com',
      password: 'sedrftgy',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
