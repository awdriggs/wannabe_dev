var nodeWatch = require('./simRequire.js');
nodeWatch();

// |MarketMaker| Constructor
var MarketMaker = function (bots) {
console.log('marketMakerConstructor loaded...')
	var self = this;
	//using data from this.listen to pass each bot let them set trade
	this.discover = function (oldp, newp, marketPrice) {
		//load in all the bots on the dance floor
		this.traderList = bots;

		//market maker sets up all the bots to get ready for trading
		for (var i = 0; i < this.traderList.length; i++) {
			//run though each trader have them track the trend
			console.log(this.traderList[i].name + " now discovering trend.")
			//pass the price data down the line
			this.traderList[i].track(oldp, newp, marketPrice);
		};
	};
	//stages trade between bots
	this.stage = function () {
		//run though each trader to see if they want to trade
		var buyer = "";
		var seller = "";
		var pair = [];

		//loop through each bot to find out who want to BUY
		for (var b = 0; b < this.traderList.length; b++) {
			if (this.traderList[b].lookingForTrade == true && this.traderList[b].orderType == "BUY") {
				//check who has most urgency
				buyer = this.traderList[b]
			};
		};
		//loop through each bot to find out who want to SELL
		for (var s = 0; s < this.traderList.length; s++) {
			if (this.traderList[s].lookingForTrade == true && this.traderList[s].orderType == "SELL") {
				//check who has most urgency
				seller = this.traderList[s]
			};
		};

		console.log("We got ourselves a trade!");
		console.log(buyer.name + " is buying and " + seller.name + " is selling");
		// sends of the traders to settle trade
		pair = [buyer, seller];
		//var possibleTrades = [];
		return pair;
	};
	//settle trades between bots
	this.settle = function (pairedUpTraders) {

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
		pairedUpTraders[1].portfolio.GOOGL = pairedUpTraders[1].portfolio.GOOGL - 1;
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
	this.service = function (watchedObj, marketPrice) {
		//listen to see any changes happend on twitterTrend
		watchedObj.watch("twitterAPI", function (id, oldval, newval) {
			//obj.watch works only on one obj at a time.
			console.log("tracking stock... (" + oldval + ") :pastTrend, (" + newval + ") :lastestTrend");
			console.log("marketMaker announce " + marketPrice + " is the current price.")

			self.discover(oldval, newval, marketPrice);

			// stage trades, loop though all possible trades for bots wanting to trade

			var pairedTraders = self.stage();
			//console.log(pairedTraders);
			
			//settle a trade btw 2 traders
			//self.settle(pairedTraders);
		
		});
	};
};


module.exports = MarketMaker;