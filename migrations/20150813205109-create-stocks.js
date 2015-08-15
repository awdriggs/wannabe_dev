'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('stocks', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.NUMERIC
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('stocks');
  }
};