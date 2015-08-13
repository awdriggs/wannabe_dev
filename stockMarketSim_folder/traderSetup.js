// |Trader| Constructor
var Trader = function (assignName, assignStartBal, assignTradeChar, assignQuantity, assignStockInterest, assignMode) {
	//trader init state
	var self = this;
	this.name = assignName;
	this.balance = assignStartBal;
	this.character = assignTradeChar;
	this.quantity =  assignQuantity;
	this.interests = assignStockInterest;
	this.on = assignMode;
	//trade state
	this.lookingForTrade = false;
	this.importance = null;
	this.orderType = null;
	this.offerPrice = null;
	this.offerStock = null;
	//ability to trade
	this.trade = function (tradeType, offer, importance) {
		console.log(this.name + "'s trade sumbitted.")
		this.lookingForTrade = true;
		this.importance = importance;
		this.orderType = tradeType;
		this.offerPrice = offer;
	};
	this.track = function (oldVal, newVal) {
		var action = null;
    	var offer = null;
    	var stockTarget = null;
    	var importance = null;
    	//pass bot info to outside func to set trade style
    	traderCharacteristics(this.character, self);
    	//send the trade
    	//self.trade(action, offer, importance);
	};
};
