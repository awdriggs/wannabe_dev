var SIM = function () {

    var marketMaker = require('./marketMaker.js');
    var traderMaker = require('./traderSetup.js');

    //{tradeLedger} JSON Obj, stores everytrade
    var tradeLedger = { "trades":[{"buyer":"Bot1_name", "seller":"Bot2_name", "timeOfTrade":1439254635102, "price":50, "stock":'goog'}]
    };

    var stocks = {
        "goog": { count: 0, attitude: 0 },
        "appl": { count: 0, attitude: 0 },
        "fb": { count: 0, attitude: 0 },
        "amzm": { count: 0, attitude: 0 },
        "twtr": { count: 0, attitude: 0 },
        "msft": { count: 0, attitude: 0}
    };

    //set test variable enviroment        
    var marketMakerBuyerBot = new traderMaker('R2D2', 300000, 'marketBuyer', 0, 'goog', true, 5, 5, 5); 
    var marketMakerSellerBot = new traderMaker('C3PO' ,100000, 'marketSeller', 5000, 'goog', true, 5, 5, 5);
    var marketMakerTradeBot = new traderMaker('ED209' ,100000, 'marketTrader', 500, 'goog', true, 5, 5, 5);

    //all the bots that lives in the sim
    var botArray = [
        marketMakerBuyerBot, 
        marketMakerSellerBot,
        marketMakerTradeBot
    ];

    var marketMakerBot = new marketMaker(botArray); 
    //make the world go round
    marketMakerBot.service(trend, price);
    /*
    var process = function() {
        //MAIN SIM FILE LOADS IN DEPENDENCIES
        console.log("========== ========== ========== ========== =========="); 
        console.log("sim is starting captainn!")
        
        //var tweetCounter = 0;
        var refreshIntervalId = setInterval( function() { 
            console.log("---------- ---------- ---------- ---------- ----------"); 
            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }

            //trend.twitterAPI = getRandomArbitrary(-10, 10);
            
            tweetCounter = tweetCounter + 1;
            //sets sim trade count
            if (tweetCounter == 1) {
                clearInterval(refreshIntervalId);
                console.log("---------- ---------- ---------- ---------- ----------");
                console.log("dasz it, sim ended.")
            };
        }, 1000);
    };
    */
    //exports func that runs the sim
    //module.exports.process = process;
};
var trend = {twitterAPI: 5555};
//{stockListing} JSON obj, stores the current value of stock
//which would need to be grabbed from the database
var stockListing = { "market":[ {"GOOG": 500} ] };
var price = stockListing.market[0].GOOG;

module.exports = SIM;
module.exports.trend = trend;
module.exports.price = price;