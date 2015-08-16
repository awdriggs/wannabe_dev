// |MarketMaker| Constructor
var MarketMaker = function (initBotsArray, initStocksArray) {
console.log('marketMakerConstructor loaded...')

	var self = this;
	//hold input stock info name and price of each stock
	this.marketStockListing = initStocksArray;

	//this.testStock = initStocksArray[0].name;
	//this.marketMakersPrice = parseFloat(initStocksArray[0].price);

	//using data from this.listen to pass each bot let them set trade
	this.discover = function (currentStockPrice, newval) {
		//load in all the initBotsArray on the dance floor
		this.traderList = initBotsArray;

		//market maker sets up all the initBotsArray to get ready for trading
		for (var i = 0; i < this.traderList.length; i++) {
			//run though each trader have them track the trend
			console.log(this.traderList[i].name + " now discovering trend.")
			//pass the price data down the line
			this.traderList[i].track(newval, marketPrice);
		};
	};
	//stages trade between initBotsArray
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
	//settle trades between initBotsArray
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
		// new stock price
		var newPrice = (pairedUpTraders[0].offerPrice + pairedUpTraders[1].offerPrice) / 2;
		return newPrice;
	};
	this.yell = function (state, stockName, stockPrice) {
		var currentState = null;
		if (state == 'start') {
			currentState = ' current price: $';
		}else if (state == 'finish') {
			currentState = ' new price: $';
		};
		console.log('>> >> >> >> $' + stockName + currentState + stockPrice + ' << << << <<');
	};
	// main simulation logic
	this.service = function (watchedObj) {
		// listen to see any change happenes to twitterTrend
		Object.observe(watchedObj, function(changes) {
			//[ { symbol: '$goog', count: 1, attitude: 3, change: 3, pchange: 3 } ]
			console.log("The following marketMaker saw a change in twitter stream.")
			var twitterUpdates = changes[0].object.API;

			// reports current market state at start of twitter update
			console.log("There are " + (self.marketStockListing.length)  + " stocks in db.");
			
			for (var t = 0; t < twitterUpdates.length; t++) {
				//console.log(twitterUpdates[t].symbol + ":" + twitterUpdates[t].pchange);

				//compare the twitter stock name to database stock name
				var stockName = twitterUpdates[t].symbol.toUpperCase();
				var tempName = '$' + self.marketStockListing[t].name;
				if (stockName == tempName) {
					var currentStockName = stockName;
					var currentStockPrice = parseFloat(self.marketStockListing[t].price);
					
					self.yell('start', currentStockName, currentStockPrice);
					
					// pass info to bots so bot can decide what they want to do
					self.discover(currentStockPrice, twitterUpdates[t].pchange);

					/*					
					// loop though all stock symbols to trigger the trade setups

					// stage trades, loop though all bot wanting to trade
					var pairedTraders = self.stage();

					//settle a trade btw 2 traders
					var newMarketPrice = self.settle(pairedTraders, self.marketMakersPrice);
					self.marketMakersPrice = newMarketPrice;

					self.yell('finish', currentStockName, currentStockPrice);
					*/
				};
				
			};

		});
		/*
		// watch to see any change happenes to stock market price
		Object.observe(self, function(changes) {
			console.log("Stock market price has changed...to" + changes.object.marketMakersPrice);
		});	
		*/
	};

};

module.exports = MarketMaker;