'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('bots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      botname: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.INTEGER
      },
      character: {
        type: Sequelize.STRING
      },
      stockinterest: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      risktolerance: {
        type: Sequelize.INTEGER
      },
      stepsize: {
        type: Sequelize.INTEGER
      },
      attitude: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.STRING
      },
      "userId": {
        type: Sequelize.INTEGER
      },
      "stockId": {
        type: Sequelize.INTEGER
      },
      "companyId": {
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('bots');
  }
};