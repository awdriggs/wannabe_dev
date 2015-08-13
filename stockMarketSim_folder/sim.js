/*
//{tradeLedger} JSON Obj, stores everytrade
var tradeLedger = {
	"trades":[{"buyer":"Bot1_name", "seller":"Bot2_name", "timeOfTrade":1439254635102, "price":50, "stock":'goog'}]
};
*/

//{stockListing} JSON obj, stores the current value of stock
/*
var stockListing = {
	"market":[
		{"GOOGL": 500}
	]
};
*/
/*
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
*/

var marketMaker = require('./marketMaker.js');
var traderMaker = require('./traderSetup.js');

//set test variable enviroment        
var marketMakerBuyerBot = new traderMaker('R2D2', 300000, 'marketBuyer', 0, 'goog', true, 5, 5, 5); 
var marketMakerSellerBot = new traderMaker('C3PO' ,100000, 'marketSeller', 500, 'goog', true, 5, 5, 5);

var botArray = [
    marketMakerBuyerBot, 
    marketMakerSellerBot
    ];

var trend = {twitterAPI: 0};
console.log("Twitter API stream returning data..."); 
var marketMakerBot = new marketMaker(botArray); 
marketMakerBot.service(trend);

var process = function() {
    //MAIN SIM FILE LOADS IN DEPENDENCIES
    console.log("========== ========== ========== ========== =========="); 
    console.log("sim is starting captainn!")
    
    var tweetCounter = 0;
    var refreshIntervalId = setInterval( function() { 
        console.log("---------- ---------- ---------- ---------- ----------"); 
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
              
        tweetCounter = tweetCounter + 1;
        trend.twitterAPI = getRandomArbitrary(-10, 10);
        //console.log('>> >> >> >> $goog current price: ' + stockListing.market[0].goog + ' << << << <<');

        //sets sim trade count
        if (tweetCounter == 1) {
            clearInterval(refreshIntervalId);
            console.log("---------- ---------- ---------- ---------- ----------");
            console.log("dasz it, sim ended.")
        };

    }, 1000);
};

//exports func that runs the sim
module.exports.process = process;