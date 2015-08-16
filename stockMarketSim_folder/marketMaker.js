// |MarketMaker| Constructor
var MarketMaker = function (initBotsArray, initStocksArray) {
console.log('marketMakerConstructor loaded...')

	var self = this;
	//hold input stock info name and price of each stock
	this.marketStockListing = initStocksArray;
	this.marketTraderBots = initBotsArray;
	//current twitter update session
	this.stockOfInterestName = [];
	this.stockOfInterestPrice = [];
	this.trendValue = null;

	this.yell = function (state) {
		var currentState = null;
		if (state == 'start') {
			currentState = ' current price: ';
		}else if (state == 'finish') {
			currentState = ' new price: ';
		};
		for (var y = 0; y < self.stockOfInterestName.length; y++) {
			console.log('>> >> >> >> ' + self.stockOfInterestName[y] + currentState + self.stockOfInterestPrice[y] + ' << << << <<');
		};
	};
	// discover the twitter stream and hold the data
	this.discover = function (twitterUpdatesInput) {
		//console.log(twitterUpdatesInput);
		for (var t = 0; t < twitterUpdatesInput.length; t++) {
			var currentTwitStock = twitterUpdatesInput[t].symbol.toUpperCase();
			self.stockOfInterestName.push(currentTwitStock);

			//find price of stocks
			for (var p = 0; p < self.marketStockListing.length; p++) {
				if (currentTwitStock == self.marketStockListing[p].name) {
					self.stockOfInterestPrice.push(self.marketStockListing[p].price);
				};
			};
		};
		self.trendValue = twitterUpdatesInput[0].pchange;
	};
	// pass info to bots so bot can decide what they want to do
	this.pass = function () {
				
		for (var s = 0; s < self.stockOfInterestName.length; s++) {
			//console.log(self.stockOfInterestName[s] + " is on the table...");
			var currentStock = self.stockOfInterestName[s];

			for (var b = 0; b < self.marketTraderBots.length; b++) {
				// find which bot is interested
				if (currentStock == self.marketTraderBots[b].stockinterest) {
					console.log(self.marketTraderBots[b].name + " now learning about " + self.marketTraderBots[b].stockinterest +  " trend.");
					
					//pass the price data down the line
					self.marketTraderBots[b].track(self.stockOfInterestPrice[s], self.trendValue);
				};
			};
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
	// starts the listensers on market maker
	this.service = function (watchedObj) {
		// listen to see any change happenes to twitterTrend
		Object.observe(watchedObj, function(changes) {
			//[ { symbol: '$goog', count: 1, attitude: 3, change: 3, pchange: 3 } ]
			console.log("The following marketMaker saw a change in twitter stream.")
			var twitterUpdates = changes[0].object.API;

			// reports current market state at start of twitter update
			console.log("There are " + (self.marketStockListing.length)  + " stocks in db.");

			// main simulation logic starts
			self.discover(twitterUpdates); 

			//report stock names and prices 
			self.yell('start');

			//pass data to bots
			self.pass();

			/*					
			// loop though all stock symbols to trigger the trade setups

			// stage trades, loop though all bot wanting to trade
			var pairedTraders = self.stage();

			//settle a trade btw 2 traders
			var newMarketPrice = self.settle(pairedTraders, self.marketMakersPrice);
			self.marketMakersPrice = newMarketPrice;

			self.yell('finish', currentStockName, currentStockPrice);
			*/
		});
	};

	/*
	// watch to see any change happenes to stock market price
	Object.observe(self, function(changes) {
		console.log("Stock market price has changed...to" + changes.object.marketMakersPrice);
	});	
	*/

};

module.exports = MarketMaker;