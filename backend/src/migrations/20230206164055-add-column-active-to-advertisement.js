'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Advertisements', // table name
        'status', // new field name
        {
          type: Sequelize.INTEGER,
        },
      ),
      queryInterface.removeColumn('Advertisements', 'product_id'),
    ]);
  },
  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Advertisements', 'status'),
    ]);
  }
};
