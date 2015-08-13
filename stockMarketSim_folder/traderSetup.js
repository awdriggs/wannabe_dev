var tradeLogic = require('./tradeLogic.js');

// |Trader| Constructor
var Trader = function (assignName, assignStartBal, assignTradeChar, assignQuantity, assignStockInterest, assignMode, assignTolerance, assignStepSize, assignAttitude) {

	console.log('traderConstructor loaded...')
	//trader init state
	var self = this;
	this.name = assignName;
	this.balance = assignStartBal;
	this.character = assignTradeChar;
	this.quantity =  assignQuantity;
	this.interests = assignStockInterest;
	//user change-able attr
	this.riskTolerance = assignTolerance;
	this.stepSize = assignStepSize;
	this.attitude = assignAttitude;
	this.on = assignMode;
	//trade state
	this.lookingForTrade = false;
	this.urgency = null;
	this.orderType = null;
	this.offerPrice = null;
	this.offerStock = null;
	//ability to trade
	this.trade = function (tradeType, offer, urgency) {
		console.log(this.name + "'s trade sumbitted.")
		this.lookingForTrade = true;
		this.orderType = tradeType;
		this.offerPrice = offer;
		this.urgency = urgency;
	};
	this.track = function (oldVal, newVal) {
    	//pass bot info to outside func to set trade style/characteristics
    	tradeLogic(this.character, self);
    	//send the trade
    	//self.trade(action, offer, urgency);
	};
};

module.exports = Trader;