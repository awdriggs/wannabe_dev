//{tradeLedger} JSON Obj, stores everytrade
var tradeLedger = {
	"trades":[
    	{"buyer":"Bot1", "seller":"Bot2", "timeOfTrade":1439254635102, "price":50, "stock":'GOOGL'}
	]
};
//{stockListing} JSON obj, stores the current value of stock
var stockListing = {
	"market":[
		{"GOOGL": 500}
	]
};
//{twitterTrend} basic obj, updates via twitter API
var twitterTrend = {
	"GOOGL": 0
};

//set test variable enviroment
var tweetCounter = 0;
var bot1 = new Trader('R2D2', 3000000, 'pump'); 
var bot2 = new Trader('C3PO' ,1000000, 'dump');
var marketMakerBot = new MarketMaker([bot1, bot2]); 
marketMakerBot.service();

/*
var refreshIntervalId = setInterval( function() { 
	console.log("---------- ---------- ---------- ---------- ----------"); 
	console.log("Twitter API returning data..."); 
	function getRandomArbitrary(min, max) {
	    return Math.random() * (max - min) + min;
	}
	twitterTrend.GOOGL = getRandomArbitrary(-10, 10);
	console.log('>> >> >> >> $GOOGL current price: ' + stockListing.market[0].GOOGL + ' << << << <<');
	tweetCounter = tweetCounter + 1;

    if (tweetCounter == 2000) {
    	clearInterval(refreshIntervalId);
    	console.log("sim ended.")
    };

    console.log(tradeLedger);
}, 1000);
*/

twitterTrend.GOOGL = 0;
console.log('>> >> >> >> $GOOGL current price: ' + stockListing.market[0].GOOGL + ' << << << <<');