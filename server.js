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
    makeBots: function (initBotinfo, initPrice) {
        /*
        for (var key in initBotinfo) {
           if (initBotinfo.hasOwnProperty(key)) {
               var obj = initBotinfo[key];
                var currentBot = new traderMaker(key, obj.balance, obj.character, obj.quantity, obj.interests, obj.active, obj.riskTolerance, obj.stepSize, obj.attitude)
                this.botArray.push(currentBot);
            };
        };
        */
        for (var b = 0; b < initBotinfo.length; b++) {
            var currentBot = new traderMaker(initBotinfo[b].botname, initBotinfo[b].balance, initBotinfo[b].character, initBotinfo[b].quantity, initBotinfo[b].interests, initBotinfo[b].active, initBotinfo[b].riskTolerance, initBotinfo[b].stepSize, initBotinfo[b].attitude)
                this.botArray.push(currentBot);
        };
        this.marketMakerBot = new marketMaker(this.botArray, initPrice); 
        console.log("This is market starting price " + this.marketMakerBot.marketMakersPrice)
    },
    openMarket: function (trend) {
        this.marketMakerBot.service(trend);
    }
};
// set to change, change drive the sim
var twitterTrend = {twitterAPI: 5555};

// test stock info from db
var stocksAryFromDatabase = [
    {
        id: 1,
        name: "$GOOGL",
        price: "111.111"
    },
    {
        id: 2,
        name: "$AAPL",
        price: "35.125"
    }
];
// test bot info from db
var botAryFromDatabase = [
    {
        id: 1,
        botname: 'R2D2',
        balance: 300000,
        character: "marketBuyer",
        stockinterest: "$GOOGL",
        quantity: 100,
        risktolerance: 5,
        stepsize: 5,
        attitude: 5,
        active: "True",
        userId: 0,
        stockId: 1,
        companyId: 1
    },
    {
        id: 2,
        botname: 'C3PO',
        balance: 100000,
        character: "marketSeller",
        stockinterest: "$GOOGL",
        quantity: 5000,
        risktolerance: 5,
        stepsize: 5,
        attitude: 5,
        active: "True",
        userId: 0,
        stockId: 1,
        companyId: 1
    },
    {
        id: 3,
        botname: 'ED209',
        balance: 100000,
        character: "marketTrader",
        stockinterest: "$GOOGL",
        quantity: 777,
        risktolerance: 5,
        stepsize: 5,
        attitude: 5,
        active: "True",
        userId: 0,
        stockId: 1,
        companyId: 1
    },
    {
        id: 4,
        botname: 'HAL9000',
        balance: 100000,
        character: "priceTrader",
        stockinterest: "$GOOGL",
        quantity: 666,
        risktolerance: 5,
        stepsize: 5,
        attitude: 5,
        active: "True",
        userId: 0,
        stockId: 1,
        companyId: 1
        }
];

// testing stock price ary 
var stockPricesAry = [];

var ready = false; //variable to flip the switch on the twitter feed.

var getStock = function () {

    models.stocks.findOne({ where: { id: 1 }}).then(function (result) {

        console.log('db finds PRICE:', result.price)
        //init the SIM to setup
        console.log(SIM.simName + ' suddenly started running...');
        console.log(SIM.botArray.length + ' is current array size.')

        stockPricesAry.push(result.price)
        SIM.makeBots(botAryFromDatabase, stocksAryFromDatabase);
        SIM.openMarket(twitterTrend);

        //result
        ready = true;
    });

}
getStock();

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

//save to db
var updateStock = function (stockparams) {
    models.stocks.findOne({ where: { id: stockparams.id }}).then(function (result) {
            result.update ( stockparams );
            console.log('stock price updated');
    });
}; // end updateStock

//this connects the server to the twitter api
client.stream('statuses/filter', {
    track: '$goog, $aapl, $fb, $amzm, $twtr, $msft'
}, function(stream) {

        stream.on('data', function(tweet) {

          if(ready){
            console.log('stream')
            
            var info = twitterModule.process(tweet) //this function returns the original tweet with an array of changes attached.
            console.log(info.changes) //this is an array of all the changes that happpened with a tweet

            //write some logic to show the last ten tweets
            
            //triggers sim to run

            //info.changes is an array with the changes from one tweet. 
            //write a for loop that goes through all
            //{sybmol: , change: }
            twitterTrend.twitterAPI = info.changes[0].pchange;
            console.log("current sentiment from twtr is " + twitterTrend.twitterAPI);
            var nodePrice = SIM.marketMakerBot.marketMakersPrice;
            console.log("THIS is NODE price..." + nodePrice);

            //save this mofo
            updateStock({ id: 1, price: nodePrice });
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





