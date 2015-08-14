'use strict';
module.exports = function(sequelize, DataTypes) {
  var companies = sequelize.define('companies', {
    name: DataTypes.STRING,
    startingbalance: DataTypes.INTEGER,
    currentbalance: DataTypes.INTEGER,
    profit: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        companies.hasMany(models.bots);
      }
    }
  });
  return companies;
};