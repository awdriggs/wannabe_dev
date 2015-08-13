//{tradeLedger} JSON Obj, stores everytrade
var tradeLedger = {
	"trades":[
    	{"buyer":"Bot1_name", "seller":"Bot2_name", "timeOfTrade":1439254635102, "price":50, "stock":'goog'}
	]
};
//{stockListing} JSON obj, stores the current value of stock
/*
var stockListing = {
	"market":[
		{"GOOGL": 500}
	]
};
*/
var trend = {
	twitterAPI: 0
};
var stocks = {
    "goog": {
        count: 0,
        attitude: 0
    },
    "appl": {
        count: 0,
        attitude: 0
    },
    "fb": {
        count: 0,
        attitude: 0
    },
    "amzm": {
        count: 0,
        attitude: 0
    },
    "twtr": {
        count: 0,
        attitude: 0
    },
    "msft": {
        count: 0,
        attitude: 0
    }
};
/*
//{twitterTrend} basic obj, updates via twitter API
var twitterTrend = {
	"GOOGL": 0
};
*/

//set test variable enviroment
var bot1 = new Trader('R2D2', 300000, 'pumper', 0, 'goog', true); 
var bot2 = new Trader('C3PO' ,100000, 'dumper', 500, 'goog', true);
var bot3 = new Trader('bender', 5000, 'random', 100, 'goog', true);

var bots = [bot1, bot2];
var marketMakerBot = new MarketMaker(); 
// start to wait for stream change
marketMakerBot.service();

var tweetCounter = 0;
var refreshIntervalId = setInterval( function() { 
	console.log("---------- ---------- ---------- ---------- ----------"); 
	console.log("Twitter API stream returning data..."); 
	function getRandomArbitrary(min, max) {
	    return Math.random() * (max - min) + min;
	}
	trend.twitterAPI = getRandomArbitrary(-10, 10);
	//console.log('>> >> >> >> $goog current price: ' + stockListing.market[0].goog + ' << << << <<');
	tweetCounter = tweetCounter + 1;
	//set sim trade count
    if (tweetCounter == 1) {
    	clearInterval(refreshIntervalId);
    	console.log("sim ended.")
    };

    console.log(tradeLedger);
}, 1000);

