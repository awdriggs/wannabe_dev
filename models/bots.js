'use strict';
module.exports = function(sequelize, DataTypes) {
  var bots = sequelize.define('bots', {
    botname: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    character: DataTypes.STRING,
    stockinterest: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    risktolerance: DataTypes.INTEGER,
    stepsize: DataTypes.INTEGER,
    attitude: DataTypes.INTEGER,
    active: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        bots.belongsTo(models.users);
        bots.belongsTo(models.stocks);
        bots.belongsTo(models.companies);
      }
    }
  });
  return bots;
};