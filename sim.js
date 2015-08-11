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
			}
			;
			
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
var Trader = function (assignStartBal, assignTradeChar) {
	//starts with some sum of money, and stocks 
	var self = this;
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
	this.track = function () {
		//setup trader behavior when twitterTrend change
		if (assignTradeChar == 'pump') {		
			twitterTrend.watch("GOOGL", function (id, oldval, newval) {
			    console.log( "twitter trend has changed." );
			    if ( newval >= (oldval*2) ) {
			    	console.log("I want to buy!")
			    	var bid = (stockListing.market[0].GOOGL + 1);
			    	self.trade('Buy', bid);
			    };
			});
		}else if (true) {
			twitterTrend.watch("GOOGL", function (id, oldval, newval) {
			    console.log( "twitter trend has changed." );
			    if ( newval < oldval ) {
			    	console.log("I want to sell!")
			    	var ask = (stockListing.market[0].GOOGL);
			    	self.trade('Sell', ask);
			    };
			});
		};
	};
};
// var bot1 = new Trader(3000, 'pump'); bot1.track();
// var bot2 = new Trader(1000, 'dump'); bot2.track();
// var autoTraders = [bot1, bot2]

// twitterTrend.GOOGL = 111;

// |MarketMaker| Constructor
var MarketMaker = function (traders) {
	this.traderList = traders;
	this.settle = function () {
		for (var i = 0; i < this.traderList.length; i++) {
			console.log(this.traderList[i])
		};
	};
};

// var marketMakerBot = new MarketMaker([bot1, bot2]);
