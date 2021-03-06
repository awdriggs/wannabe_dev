var tradeLogic = require('./tradeLogic.js');

// |Trader| Constructor
var Trader = function (assignId, assignName, assignStartBal, assignTradeChar, assignQuantity, assignStockInterest, assignMode, assignTolerance, assignStepSize, assignAttitude) {

	console.log('traderConstructor loaded...')
	//trader init state
	var self = this;
	this.id = assignId;
	this.name = assignName;
	this.balance = assignStartBal;
	this.character = assignTradeChar;
	this.quantity =  assignQuantity;
	this.stockinterest = assignStockInterest;
	//user change-able attr
	this.riskTolerance = assignTolerance;
	this.stepSize = assignStepSize;
	this.attitude = assignAttitude;
	this.active = assignMode;
	//trade state
	this.lookingForTrade = false;
	this.urgency = null;
	this.orderType = null;
	this.offerPrice = null;
	//trader obj attr
	this.buyPrice = 0;
    //pass bot info to outside func to set trade style/characteristics
	this.track = function (currentMarketPrice, newTrendVal) {
    	//run trade logic to set bot ready for trading
    	console.log(self.name + " tracking stock...")	
    	tradeLogic(this.character, self, currentMarketPrice, newTrendVal);
	};
	//resets trader to starting state
	this.chill = function () {
		this.lookingForTrade = false;
		this.urgency = null;
		this.orderType = null;
	};
	this.reprice = function () {
		this.offerPrice = null;
	};
};

module.exports = Trader;
