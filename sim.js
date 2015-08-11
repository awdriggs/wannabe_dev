// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------
// object.watch by Eli Grey, http://eligrey.com

if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, getter = function () {
				return oldval;
			}
			, setter = function (newval) {
				if (oldval !== newval) {
					handler.call(this, prop, oldval, newval);
					oldval = newval;
				}
				else { return false }
			};
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}

if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}
/*
* Example usage:
	var o = {p: 1};
	o.watch("p", function (id, oldval, newval) {
	    console.log( "o." + id + " changed from " + oldval + " to " + newval );
	    return newval;
	});
	o.p = 2; // should log the change
	o.p = 2; // should do nothing
*/
// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------

// {tradeLedger} JSON Obj, stores everytrade
var tradeLedger = {
	"trades":[
    	{"buyer":"Bot1", "seller":"Bot2", "timeOfTrade":1439254635102, "price":50, "stock":'GOOGL'}
	]
};

// {stockListing} JSON obj, stores the current value of stock
var stockListing = {
	"market":[
		{"GOOGL": 50}
	]
};

// {twitterTrend} basic obj, updates via twitter API
var twitterTrend = {
	"GOOGL": 0
};

// |Trader| Constructor
var Trader = function (assignName, assignStartBal, assignTradeChar) {
	//starts with some sum of money, and stocks 
	var self = this;
	this.name = assignName;
	this.balance = assignStartBal;
	this.portfolio =  { 'GOOGL': [100, 50] };
	this.character = assignTradeChar;
	//ability to trade
	this.lookingForTrade = false;
	this.orderType = null;
	this.offerPrice = 0;
	this.trade = function (tradeType, offer) {
		console.log("trade sumbitted.")
		this.lookingForTrade = true;
		this.orderType = tradeType;
		this.offerPrice = offer;
	};
	this.track = function (oldPrice, newPrice) {
		//setup trader behavior when twitterTrend change
		console.log("tracking stock..." + oldPrice + ":old price" + newPrice + ":new price");
		//basic trade logic, only buy when trend is higher than last time
		if (assignTradeChar == 'pump') {		
		    if ( newPrice > oldPrice ) {
		    	console.log("I want to buy!");
		    	var bid = (stockListing.market[0].GOOGL);
		    	self.trade('Buy', bid);
		    }else{
		    	console.log("I don't want to buy.");
			};
		//basic seller logic
		}else if (assignTradeChar == 'dump') {
		    //willing to sell if trend is less or equal to 80
		    if ( newPrice > 1 ) {
		    	console.log("I want to sell!")
		    	var ask = (stockListing.market[0].GOOGL);
		    	self.trade('Sell', ask);
		    }else{
		    	console.log("I don't want to sell.")
		    };
		};
	};
};
// var bot1 = new Trader('R2D2', 3000, 'pump'); var bot2 = new Trader('C3PO' ,1000, 'dump');

// |MarketMaker| Constructor
var MarketMaker = function (traders) {
	var self = this;
	this.traderList = traders;
	//using data from this.listen to pass each bot let them set trade
	this.discover = function (oldp, newp) {
		for (var i = 0; i < this.traderList.length; i++) {
			//run though each trader have them track the trend
			console.log(this.traderList[i].name + " now discovering price.")
			//pass the price data down the line
			this.traderList[i].track(oldp, newp);
		};
	};
	//listen to see any changes happend on twitterTrend
	this.listen = function () {
		//obj.watch works only on one obj at a time.
		twitterTrend.watch("GOOGL", function (id, oldval, newval) {
			console.log( "twitter trend has changed." );
			self.discover(oldval, newval);
		});
	};
};

// var marketMakerBot = new MarketMaker([bot1, bot2]); marketMakerBot.listen();
// twitterTrend.GOOGL = 111;


