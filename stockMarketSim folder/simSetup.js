// |Trader| Constructor
var Trader = function (assignName, assignStartBal, assignTradeChar) {
	//trader init state
	var self = this;
	this.name = assignName;
	this.balance = assignStartBal;
	this.portfolio =  { 'GOOGL': 100 };
	this.history = { "buy":[], "sell":[] };
	this.character = assignTradeChar;
	//trade state
	this.lookingForTrade = false;
	this.importance = null;
	this.orderType = null;
	this.offerPrice = null;
	this.offerStock = null;
	//ability to trade
	this.trade = function (tradeType, offer, stock, importance) {
		console.log(this.name + "'s trade sumbitted.")
		this.lookingForTrade = true;
		this.importance = importance;
		this.orderType = tradeType;
		this.offerPrice = offer;
		this.offerStock = stock;
	};
	this.track = function (oldVal, newVal) {
		var role = "";
    	var offer = 0;
    	//set buyer/seller behavior
		if (assignTradeChar == 'pump') { 
			role = 'Buy';	
		}else if (assignTradeChar == 'dump') { 
			role = 'Sell'; 
		};
    	var importanceVal = 0;
    	//buyer trade importance
	    if ( role=='Buy' && (newVal < 0) ) {
	    	//neutral
	    	offer = stockListing.market[0].GOOGL;
	    	console.log(this.name + " kind of want to " + role + " for $" + offer);
	    	importanceVal = 0;
	    }else if ( role=='Buy' && (newVal >= 0 && newVal < 5) ) {
	    	//desired buy
	    	offer = stockListing.market[0].GOOGL + 1.25;
	    	console.log(this.name + " really of want to " + role + " for $" + offer);
	    	importanceVal = 1;
	    }else if ( role=='Buy' && (newVal >= 5 && newVal <= 10)) {
	    	//desperate buy
	    	offer = stockListing.market[0].GOOGL + 2.5;
	    	console.log(this.name + " desperatelly of want to " + role + " for $" + offer);
	    	importanceVal = 2;
	    };
	    //seller trade importance
	    if ( role=='Sell' && (newVal > 0) ) {
	    	//neutral
	    	offer = stockListing.market[0].GOOGL;
	    	console.log(this.name + " kind of want to " + role + " for $" + offer);
	    	importanceVal = 0;
	    }else if ( role=='Sell' && (newVal <= 0 && newVal > -5) ) {
	    	//desired buy
	    	offer = stockListing.market[0].GOOGL - 1.5;
	    	console.log(this.name + " really of want to " + role + " for $" + offer);
	    	importanceVal = 1;
	    }else if ( role=='Sell' && (newVal <= -5 && newVal >= -10)) {
	    	//desperate buy
	    	offer = stockListing.market[0].GOOGL - 3;
	    	console.log(this.name + " desperatelly of want to " + role + " for $" + offer);
	    	importanceVal = 2;
	    };
    	//post the trade
    	self.trade(role, offer, 'GOOGL', importanceVal);
	};
};

// |MarketMaker| Constructor
var MarketMaker = function (traders) {
	var self = this;
	this.traderList = traders;
	//using data from this.listen to pass each bot let them set trade
	this.discover = function (oldp, newp) {
		for (var i = 0; i < this.traderList.length; i++) {
			//run though each trader have them track the trend
			console.log(this.traderList[i].name + " now discovering trend.")
			//pass the price data down the line
			this.traderList[i].track(oldp, newp);
		};
	};
	//stages trade between bots
	this.stage = function () {
		var buyer = "";
		var seller = "";
		var pair = [];
		for (var i = 0; i < this.traderList.length; i++) {
			//run though each trader to see if they want to trade
			if (this.traderList[i].lookingForTrade == true && this.traderList[i].orderType == "Buy") {
				buyer = this.traderList[i]
			}else if (this.traderList[i].lookingForTrade == true && this.traderList[i].orderType == "Sell") {
				seller = this.traderList[i]
			};
		};
		pair = [buyer, seller];
		return pair;
	};
	//settle trades between bots
	this.settle = function (pairedUpTraders) {
		console.log("We got ourselves a trade!");
		console.log(pairedUpTraders[0].name + " is buying "+ pairedUpTraders[1].name + " is selling");
		var d = new Date();
		//do trade operation 
		console.log("time of trade: " + d);
		var currentPrice = stockListing.market[0].GOOGL;
		var spread = (pairedUpTraders[0].offerPrice - pairedUpTraders[1].offerPrice);
		console.log("Current spread $" + spread);
		var newPrice = (pairedUpTraders[0].offerPrice + pairedUpTraders[1].offerPrice) / 2;
		//determent who the trade favors
		var settleUptonPrice = null;
		if (pairedUpTraders[0].importance > pairedUpTraders[1].importance) {
			// buyer wants it more, seller advantage
			settleUptonPrice = stockListing.market[0].GOOGL + spread;
			console.log("settled price " + settleUptonPrice + " seller advantage.")
		}else if (pairedUpTraders[1].importance > pairedUpTraders[0].importance) {
			// seller wants it more, buyer advantage
			settleUptonPrice = stockListing.market[0].GOOGL - spread;
			console.log("settled price " + settleUptonPrice + " buyer advantage.")
		}else{
			// importance is matching no advantage
			settleUptonPrice = stockListing.market[0].GOOGL;
			console.log(settleUptonPrice + " even trade.")
		};
		// money change hands
		pairedUpTraders[0].balance = pairedUpTraders[0].balance - settleUptonPrice;
		pairedUpTraders[1].balance = pairedUpTraders[1].balance + settleUptonPrice;
		//console.log("buyer balance: " + pairedUpTraders[0].balance, "seller balance: " +pairedUpTraders[1].balance)
		//take stock from seller give to buyer
		pairedUpTraders[0].portfolio.GOOGL = pairedUpTraders[0].portfolio.GOOGL + 1;
		pairedUpTraders[1].portfolio.GOOGL = pairedUpTraders[0].portfolio.GOOGL - 1;
		//reset trade state
		stockListing.market[0].GOOGL = newPrice;
		for (var t = 0; t < 2; t++) {
			pairedUpTraders[t].lookingForTrade = false;
			pairedUpTraders[t].importance = null;
			pairedUpTraders[t].orderType = null;
			pairedUpTraders[t].offerPrice = null;
			pairedUpTraders[t].offerStock = null;
		};
		// push to JSON
		var t = new Date().getTime();
		var newTrade = {"buyer":pairedUpTraders[0].name, "seller":pairedUpTraders[0].name, "timeOfTrade":t, "price":stockListing.market[0].GOOGL, "stock":'GOOGL'};
		tradeLedger.trades.push(newTrade);
	};
	this.service = function () {
		//listen to see any changes happend on twitterTrend
		twitterTrend.watch("GOOGL", function (id, oldval, newval) {
			//obj.watch works only on one obj at a time.
			console.log("tracking stock... (" + oldval + ") :pastTrend, (" + newval + ") :lastestTrend");
			self.discover(oldval, newval);
			//stage a trade
			var pairedTraders = self.stage();
			//console.log(pairedTraders);
			//settle a trade btw 2 traders
			self.settle(pairedTraders);
		});
	};
};
/*
	Bot charactistics:
		pump: always try to buy
		dump: always try to sell
*/
