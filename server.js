// DEPENDENCIES
var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	path = require('path'),
	logger = require('morgan'),
	fs = require('fs'),
	session = require('express-session'),
	models = require('./models');

var app = express();

//adding all twitter bs
var Twitter = require('twitter');
var dotter = require('dotenv').load();
var sentiment = require('sentiment');

//sockets!
var http = require('http').Server(app);
var io = require('socket.io')(http);


// node-debug server.js 
// SIM DEPENDENCIES
var marketMaker = require('./stockMarketSim_folder/marketMaker.js');
var traderMaker = require('./stockMarketSim_folder/traderSetup.js');

//SIM obj
var SIM = {
    simName: "[Stock_Bot_Simulation]",
    botArray: [],
    marketMakerBot: null,
    makeBots: function (initBotinfo, initStockinfo) {
        //loop though info from database to create bots inside of sim
        for (var b = 0; b < initBotinfo.length; b++) {
            var currentBot = new traderMaker(initBotinfo[b].id, initBotinfo[b].botname, initBotinfo[b].balance, initBotinfo[b].character, initBotinfo[b].quantity, initBotinfo[b].stockinterest, initBotinfo[b].riskTolerance, initBotinfo[b].stepSize, initBotinfo[b].attitude, initBotinfo[b].active);
                this.botArray.push(currentBot);
                //console.log(currentBot);
        };
        this.marketMakerBot = new marketMaker(this.botArray, initStockinfo); 
    },
    newBot: null,
    makeSingleBot: function (userInput) {
        //create a new bot from user input and add it to the sim
        newBot = null;
        var newUserBot = new traderMaker(userInput.botname, userInput.balance, userInput.character, 0, userInput.interest, userInput.risk, userInput.stepsize, userInput.attitude, true);
            this.marketMakerBot.marketTraderBots.push(newUserBot);
    },
    openMarket: function (trend) {
        this.marketMakerBot.service(trend);
    },
    reportStock: function () {
        var stocks = this.marketMakerBot.marketStockListing;
        for (var p = 0; p < stocks.length; p++) {
            console.log("==>> NODE announce price of " + stocks[p].name + " is at: $" + stocks[p].price + " <<<==");
        };
    },
    stocksOutInfo: {},
    packageStock: function () {
        //loop though all stock update stock prices from market maker's attr
        var stocks = this.marketMakerBot.marketStockListing;
        for (var c = 0; c < stocks.length; c++) {
            var keyStr = String(stocks[c].name);
            this.stocksOutInfo[keyStr] = stocks[c].price;
        };
    },
    //test test
    //set stock id because on stock name
    stockIdFinder: function (stockNameInput) {
        var stockStr = String(stockNameInput);
        if (stockStr == '$GOOG') { 
            return 1;
        }else if (stockStr == '$AAPL') { 
            return 2;
        }else if (stockStr == '$FB') { 
            return 3;
        }else if (stockStr == '$AMZN') { 
            return 4;
        }else if (stockStr == '$TWTR') { 
            return 5;
        }else if (stockStr == '$MSFT') { 
            return 6; 
        };
    }
};
// set to change, change drive the sim
var twitterTrend = { API:null };

// testing stock price ary 
var stockPricesAry = [];

var ready = false; //variable to flip the switch on the twitter feed.

var getStocksAndBots = function () {

    models.stocks.findAll().then(function (stocksresult) {
        models.bots.findAll().then(function (botsresult) { 
            //console.log('db finds PRICE:', stocksresult.price)
            //init the SIM to setup
            console.log(SIM.simName + ' suddenly started running...');
            console.log(SIM.botArray.length + ' is current array size.')

            //stockPricesAry.push(result.price)
            console.log(botsresult);
            SIM.makeBots(botsresult, stocksresult);
            SIM.openMarket(twitterTrend);

            //result
            ready = true;
        });
    });

}
getStocksAndBots();

// ALSO GET from db BOTS
// ALSO GET from db COMPANIES
// ALSO GET from db USERS
// ALSO GET from db NEW BOTS
// ALSO GET from db NEW COMPANIES
// ALSO GET from db NEW USERS


// LISTENER
//app.listen(3000);

//listener for sockets io
http.listen(3000, function(){
    console.log('listening on *:3000');
});

// app.set('port', process.env.PORT || 3000);

// USES
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extname: true}));
// this thing right here:
app.use(bodyParser.json());

app.use(logger('dev'));

app.use(methodOverride(function(req, res) {
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   var method = req.body._method;
   delete req.body._method;
   return method;
 };
}));

app.use(session({
	secret: 'secret',
	saveUninitialized: false,
	resave: false
}));

// ROUTES-CONTROLLER FILE SYSTEM
fs.readdirSync('./controllers').forEach(function (file) {
 if(file.substr(-3) == '.js') {
     route = require('./controllers/' + file);
     console.log('this is the route', route);
     route.controller(app);
 };
});

// SOCKET //////

// client side socket.emit('change_bot', "working?" ); 
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('change_bot', function(botObj){
    console.log(botObj);
    SIM.makeSingleBot(botObj);

    //botObj is the same object that is being passed into sequalize
    //do what you wan with it here!
  });
});


// TWITTER ////////////////////////////////////////////////////////////////////////////////////

//twitter keys
var client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.TOKEN_KEY,
    access_token_secret: process.env.TOKEN_SECRET
});

console.log(process.env.TWITTER_KEY)
var twitterModule = require('./twitter_module');

var tweetArray = [];

//save to db end updateStock
var updateStock = function (stockId, stockPrice) {
    models.stocks.findOne({ where: { id: stockId }}).then(function (result) {
            result.update ({ price: stockPrice });
            console.log('stock price updated in db.');
    });
};

//update bot in db after each trade
var updateBot = function (botId, balanceInput, quantityInput ) {
    models.bots.findOne( {where: { id: botId }} ).then(function (result) {
        result.update({ balance: balanceInput, quantity: quantityInput 
        });
   }); 
};

//
var tradeCount = null;
var reportCount = null;

//this connects the server to the twitter api
client.stream('statuses/filter', {
    track: '$goog, $aapl, $fb, $amzn, $twtr, $msft'
}, function(stream) {

        stream.on('data', function(tweet) {

          if(ready){
            console.log('stream')
            
            var info = twitterModule.process(tweet) //this function returns the original tweet with an array of changes attached.
            console.log(info.changes) 
            //this is an array of all the changes that happpened with a tweet
            //write some logic to show the last ten tweets

            //info.changes is an array with the changes from one tweet. 
            //triggers sim to run
            twitterTrend.API = info.changes;
            
            Object.observe(SIM.marketMakerBot, function(changes) {
                changes.forEach(function(change) {

                    if (change.name == 'marketTraderTradeCount' && change.object.marketTraderTradeCount != tradeCount) {
                        tradeCount = change.object.marketTraderTradeCount;
                        console.log("Trade has fired, trade # " + tradeCount);
                        //put in info for the trade feed here
                        io.emit('trade', SIM.marketMakerBot.marketTraderTradeReport); 

                        //grab stock info from marketMaker
                        var currentStockName = SIM.marketMakerBot.currentTradeStockName;
                        var currentStockPrice = SIM.marketMakerBot.currentTradeStockPrice;
                        var currentStockId = SIM.stockIdFinder(currentStockName);
                        //update stock prices in databse
                        //console.log("current stock id " + currentStockId);
                        updateStock(currentStockId, currentStockPrice);
                        
                        //update bot in database who just traded in database
                        updateBot(SIM.marketMakerBot.currentTraderPairId[0].id, SIM.marketMakerBot.currentTraderPairId[0].balance, SIM.marketMakerBot.currentTraderPairId[0].quantity);
                        updateBot(SIM.marketMakerBot.currentTraderPairId[1].id, SIM.marketMakerBot.currentTraderPairId[1].balance, SIM.marketMakerBot.currentTraderPairId[1].quantity);

                    };
                    
                });
            });

            //print stock prices on NODE, emit to view             
            Object.observe(SIM.marketMakerBot, function(changes) {
                // This asynchronous callback runs
                changes.forEach(function(change) {
                    // Letting us know what changed
                    //console.log("This is what changed..." + change.name);
                    if (change.name == 'marketTraderWrap' && change.oldValue != reportCount) {
                        //triggers the stock reporting.
                        reportCount = change.oldValue;
                        console.log("And We finished trading...and reportCount is " + reportCount);
                        SIM.packageStock();
                        console.log(SIM.stocksOutInfo);
                        
                        io.emit('price_update', SIM.stocksOutInfo)
                        //SIM.reportStock();
                    };
                });
            });
            
            //the id will need to be dynamic in the future...

            // UPDATE COMPANY INFO
            // UPDATE BOT INFO
            // UPDATE USER INFO

            io.emit('tweet', tweet)
            //console.log(tweet) //will print tweet json
            
            //add an emitter for the trades
            //adam needs an objec that I can parse on the client side

            //add an emitter for the ticker symbol prices
            //needs an object with all the ticker symbols and the prices

            } else {
                console.log('twitter hit but sim not ready')
            }

    }) //end of data stream on

})

//just for testing the twitter oauth,
app.get('/search_test', function(req, res) {
    client.get('search/tweets', {
        q: '$GOOG', count: 100
    }, function(error, tweets, response) {
        res.send(tweets);
    });
})





