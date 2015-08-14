'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password_digest: {
        type: Sequelize.STRING
      },
      companyname: {
        type: Sequelize.STRING
      },
      currentbalance: {
        type: Sequelize.INTEGER
      },
      startingbalance: {
        type: Sequelize.INTEGER
      },
      profit: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};