//var nodeWatch = require('./simRequire.js');
//nodeWatch();

// |MarketMaker| Constructor
var MarketMaker = function (bots, initMarketPrice) {
console.log('marketMakerConstructor loaded...')

	var self = this;
	this.marketMakersPrice = initMarketPrice;
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

		console.log(buyer.name + " is buying and " + seller.name + " is selling");
		// sends of the traders to settle trade
		pair = [buyer, seller];
		//var possibleTrades = [];
		return pair;
	};
	//settle trades between bots
	this.settle = function (pairedUpTraders, marketPrice) {

		var d = new Date();
		console.log("We got ourselves a trade!");
		console.log("Time of trade: " + d);

		//determent spread on the trade 
		var currentPrice = marketPrice;
		var spread = (pairedUpTraders[0].offerPrice - pairedUpTraders[1].offerPrice);
		console.log("Current spread on trade :$" + spread);
		
		//determent who the trade favors
		var settleUptonPrice = null;

		// buyer wants it more, seller advantage
		if (pairedUpTraders[0].urgency > pairedUpTraders[1].urgency) {
			settleUptonPrice = marketPrice + spread;
			console.log("settled price " + settleUptonPrice + " " + pairedUpTraders[1].name + " advantage.")
		// seller wants it more, buyer advantage
		}else if (pairedUpTraders[1].urgency > pairedUpTraders[0].urgency) {
			settleUptonPrice = marketPrice - spread;
			console.log("settled price " + settleUptonPrice + " " + pairedUpTraders[0].name + " advantage.")
		// importance is matching no advantage
		}else{
			settleUptonPrice = marketPrice;
			console.log("settled price " + settleUptonPrice + " even trade.")
		};

		// money change hands
		pairedUpTraders[0].balance = pairedUpTraders[0].balance - settleUptonPrice;
		pairedUpTraders[1].balance = pairedUpTraders[1].balance + settleUptonPrice;
		// stock change hands
		pairedUpTraders[0].quantity = pairedUpTraders[0].quantity + 1;
		pairedUpTraders[1].quantity = pairedUpTraders[1].quantity - 1;
		
		/*
		//reset trade state
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
		*/

		// new stock price
		var newPrice = (pairedUpTraders[0].offerPrice + pairedUpTraders[1].offerPrice) / 2;
		return newPrice;
	};
	this.service = function (watchedObj) {

		// listen to see any change happenes to twitterTrend
		Object.observe(watchedObj, function(changes) {

			var newval = (changes[0].object.twitterAPI);
			var oldval = (changes[0].oldValue);

			console.log("tracking stock. (" + oldval + ") :pastTrend, (" + newval + ") :lastestTrend");
			console.log("marketMaker announce " + self.marketMakersPrice + " is the current price.")

			self.discover(oldval, newval, self.marketMakersPrice);

			// stage trades, loop though all possible trades for bots wanting to trade
			var pairedTraders = self.stage();
			//console.log(pairedTraders);
			
			//settle a trade btw 2 traders
			var newMarketPrice = self.settle(pairedTraders, self.marketMakersPrice);
			console.log("This is new market price after a trade..." + newMarketPrice)
			console.log('>> >> >> >> ' + "$GOOG" + ' current price: $' + newMarketPrice + ' << << << <<');
			
			self.marketMakersPrice = newMarketPrice;
			//return newMarketPrice;
		});
		
		// watch to see any change happenes to stock market price
		Object.observe(self, function(changes) {
			console.log("Stock market price has changed...to" + changes.object.marketMakersPrice);
		});
		
		// obj.watch works only on one obj at a time.
		// watchedObj.watch("twitterAPI", function (id, oldval, newval) {});	
	};
	this.returnPrice = function () {
		return self.marketMakersPrice;
	};
};

module.exports = MarketMaker;
