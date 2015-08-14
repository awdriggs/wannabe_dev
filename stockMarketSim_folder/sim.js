var SIM = function (initBotinfo, initMarketInfo, initCompanyInfo) {

    var marketMaker = require('./marketMaker.js');
    var traderMaker = require('./traderSetup.js');
/*
    //{tradeLedger} JSON Obj, stores everytrade
    var tradeLedger = { "trades":[{"buyer":"Bot1_name", "seller":"Bot2_name", "timeOfTrade":1439254635102, "price":50, "stock":'goog'}]
    };
*/
/*    
    var stocks = {
        "goog": { count: 0, attitude: 0 },
        "appl": { count: 0, attitude: 0 },
        "fb": { count: 0, attitude: 0 },
        "amzm": { count: 0, attitude: 0 },
        "twtr": { count: 0, attitude: 0 },
        "msft": { count: 0, attitude: 0}
    };
*/
    console.log(initBotinfo);
    //bot array with all the bots
    //var botArray = [];
/*    
    //create bots from database
    for (var e = 0; e < initBotinfo.length; e++) {
        //new traderMaker(); 
        console.log(initBotinfo[e])
    };
*/
    //setup market maker     
    //var marketMakerBot = new marketMaker(botArray); 
    //make the world go round
    //marketMakerBot.service(trend, price);

};

var trend = {twitterAPI: 5555};
//{stockListing} JSON obj, stores the current value of stock
//which would need to be grabbed from the database
var stockListing = { "market":[ {"GOOG": 500} ] };
var price = stockListing.market[0].GOOG;

module.exports = SIM;
module.exports.trend = trend;
module.exports.price = price;