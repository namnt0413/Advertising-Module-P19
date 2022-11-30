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

     return queryInterface.bulkInsert('Advertisements', [
      {
        name: 'Sắm TV QLED nhận deal căng đét',
        content: 'Tặng ngay Màn hình cong 24”',
        visitTime: 20,
        image: '',
        type: 1,
        product_id: 1,
        startedAt: "2022-11-27",
        finishedAt: "2022-11-29",

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sắm gia dụng trúng deal đậm',
        content: 'Mua 1 tặng 1 chốt thêm quà đậm',
        visitTime: 30,
        image: '',
        type: 1,
        startedAt: "2022-12-12",
        finishedAt: "2022-12-24",

        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
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
