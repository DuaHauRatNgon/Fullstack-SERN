'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'duahauratngon@gmail.com',
      password: 'abc123',
      firstName: 'meo',
      lastName: 'beo', 
      address: 'Vn',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};