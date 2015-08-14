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
	this.active = assignMode;
	//trade state
	this.lookingForTrade = false;
	this.urgency = null;
	this.orderType = null;
	this.offerPrice = null;
    //pass bot info to outside func to set trade style/characteristics
	this.track = function (oldVal, newVal, marketPrice) {
    	//console.log (marketPrice + ' is the current price traker see.')
    	tradeLogic(this.character, self, marketPrice, oldVal, newVal);
	};
	//resets trader to starting state
	this.chill = function (){
		this.lookingForTrade = false;
		this.urgency = null;
		this.orderType = null;
		this.offerPrice = null;
	}
};

module.exports = Trader;