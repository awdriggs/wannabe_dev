'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    companyname: DataTypes.STRING,
    currentbalance: DataTypes.INTEGER,
    startingbalance: DataTypes.INTEGER,
    profit: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        users.hasMany(models.bots);
      }
    }
  });
  return users;
};