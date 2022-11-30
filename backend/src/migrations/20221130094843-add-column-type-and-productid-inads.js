'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Advertisements', // table name
        'type', // new field name
        {
          type: Sequelize.STRING,
        },
      ),
      queryInterface.addColumn(
        'Advertisements',
        'product_id',
        {
          type: Sequelize.STRING,
        },
      ),
    ]);
  },
  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Advertisements', 'type'),
      queryInterface.removeColumn('Advertisements', 'product_id'),
    ]);
  }
};