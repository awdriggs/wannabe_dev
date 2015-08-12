'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    companyname: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    bot: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};