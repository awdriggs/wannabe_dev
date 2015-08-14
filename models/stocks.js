'use strict';
module.exports = function(sequelize, DataTypes) {
  var stocks = sequelize.define('stocks', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        stocks.hasMany(models.bots);
      }
    }
  });
  return stocks;
};