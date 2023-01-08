'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     return queryInterface.bulkInsert('Advertisements', [{
      name: 'Black Friday Săn deal mê say',
      content: 'Chơi game săn voucher đến 1.5 triệu. Ưu đãi đến 50%, thu cũ đổi mới hỗ trợ đến 5 triệu, trả góp 0%.',
      visitTime: 10,
      image: '',
      type: 2,
      startedAt: "2022-08-8",
      finishedAt: "2022-09-9",

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
