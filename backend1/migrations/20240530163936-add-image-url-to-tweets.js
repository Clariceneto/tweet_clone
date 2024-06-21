'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('tweets');
    if (!tableInfo.imageUrl) {
      await queryInterface.addColumn('tweets', 'imageUrl', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('tweets');
    if (tableInfo.imageUrl) {
      await queryInterface.removeColumn('tweets', 'imageUrl');
    }
  }
};
