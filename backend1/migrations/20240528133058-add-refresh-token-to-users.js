'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Users');
    if (!tableInfo.refreshToken) {
      await queryInterface.addColumn('Users', 'refreshToken', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Users');
    if (tableInfo.refreshToken) {
      await queryInterface.removeColumn('Users', 'refreshToken');
    }
  }
};
