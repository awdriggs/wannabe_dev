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
        for (var key in initBotinfo) {
           if (initBotinfo.hasOwnProperty(key)) {
               var obj = initBotinfo[key];
                var currentBot = new traderMaker(key, obj.balance, obj.character, obj.quantity, obj.interests, obj.active, obj.riskTolerance, obj.stepSize, obj.attitude)
                this.botArray.push(currentBot);
            };
        };
        this.marketMakerBot = new marketMaker(this.botArray, initPrice); 
        console.log("This is market starting price " + this.marketMakerBot.marketMakersPrice)
    },
    openMarket: function (trend) {
        this.marketMakerBot.service(trend);
    }
};
var twitterTrend = {twitterAPI: 5555};

// starts the simulation a.k.a the humancentipad
var botInfoFromDatabase = { 
    'R2D2': {
        balance: 300000, 
        character: 'marketBuyer',
        quantity: 110,
        interests: 'goog',
        active: true,
        riskTolerance: 5,
        stepSize: 5,
        attitude: 5
    },
    'C3PO': {
        balance: 100000,
        character: 'marketSeller',
        quantity: 5000,
        interests: 'goog',
        active: true,
        riskTolerance: 5,
        stepSize: 5,
        attitude: 5
    },
    'ED209': {
        balance: 100000,
        character: 'marketTrader',
        quantity: 500,
        interests: 'goog',
        active: true,
        riskTolerance: 5,
        stepSize: 5,
        attitude: 5
    },
    'HAL9000': {
        balance: 90000,
        character: 'priceTrader',
        quantity: 500,
        interests: 'goog',
        active: false,
        riskTolerance: 5,
        stepSize: 5,
        attitude: 5
    }
}


var ready = false; //variable to flip the switch on the twitter feed.

var getStock = function () {

    models.stocks.findOne({ where: { id: 1 }}).then(function (result) {

        console.log('db finds PRICE:', result.price)
        //init the SIM to setup
        console.log(SIM.simName + ' suddenly started running...');
        console.log(SIM.botArray.length + ' is current array size.')

        SIM.makeBots(botInfoFromDatabase, result.price);
        SIM.openMarket(twitterTrend);

        //result
        ready = true;
    });

}
getStock();


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
            //calles the process function in the twitter module. better way to handle trends which is in the same file?
            //twitterModule.process(tweet.text)

            //do the emiting here?
            //io.emit
            var info = twitterModule.process(tweet) //this function returns the original tweet with an array of changes attached.
            console.log(info.changes) //this is an array of all the changes that happpened with a tweet

            //write some logic to show the last ten tweets
            
            //triggers sim to run
            twitterTrend.twitterAPI = info.changes[0].pchange;
            console.log("current sentiment from twtr is " + twitterTrend.twitterAPI);
            var nodePrice = SIM.marketMakerBot.marketMakersPrice;
            console.log("THIS is NODE price..." + nodePrice);

            //save this mofo
            updateStock({ id: 1, price: nodePrice });

            io.emit('tweet', tweet)
            //console.log(tweet) //will print tweet json
        
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





