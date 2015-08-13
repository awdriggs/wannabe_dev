var express = require('express');
var app = express();
var logger = require('morgan');
var path = require('path');
var Twitter = require('twitter');
var dotter = require('dotenv').load();
var sentiment = require('sentiment');

//sockets!
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.listen(3000);
http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.use(logger('dev'));

var client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.TOKEN_KEY,
    access_token_secret: process.env.TOKEN_SECRET
});

var trends = {
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
}

// ROUTES ////////////////////////////////////////////////////////////////////////////////////

// HOME
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// SOCKET MAGIC ///////////////////////////////////////////////////////////////////////////////

io.on('connection', function(socket){
  console.log('a user connected');
   socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//put this somewhere useful
//io.emit('tweet', tweet)


// TWITTER ////////////////////////////////////////////////////////////////////////////////////

//this connections the server to the twitter api
//will this cause problems in the future?
client.stream('statuses/filter', {
    track: '$goog, $aapl, $baba, $fb, $amzm, $twtr, $msft'
}, function(stream) {
    stream.on('data', function(tweet) {

        //function for logic of tweets
        //there is a call at the end to change the twitter key
        log(tweet.text)
        

    })
})

//This is the logic for processing the tweets
var log = function(tweet) {
    //grab the symbol names in the symbols obj
    var trendKeys = Object.keys(trends)

    //loop through the keys, look to see if the key is in the tweet
    for (var i = 0; i < trendKeys.length; i++) {
        var tickerSymbol = '$' + trendKeys[i].toUpperCase();

        if (tweet.indexOf(tickerSymbol) > -1) {
            console.log(tweet)

            //increase the count
            trends[trendKeys[i]].count += 1;

            //grab the sentiment
            var tweetSentiment = sentiment(tweet);
            console.log("score type " + typeof tweetSentiment.score + " " + tweetSentiment.score)
            //current sentiment
            var currentSentiment = trends[trendKeys[i]].attitude
            console.log("current type " + typeof currentSentiment + " " + currentSentiment)
            //new sentiment
            var newSentiment = currentSentiment + tweetSentiment.score
            console.log("new type " + typeof newSentiment + " " + newSentiment)
            //calculate % change
            var change = percentChange(newSentiment, currentSentiment)
            console.log("change " + change)
            //pass change to sim!!!!!!!!!!!!!

            //change the attitude according to the returned sentiment socre
            trends[trendKeys[i]].attitude = newSentiment
            //see the new sentiment
            
            console.log(tickerSymbol + ' hit, % change ' + change)
            console.log(trends[trendKeys[i]])
            //package the tweet, count, and attitude for the front end?

            //send change to the simulation
            twitterTrend.GOOGL = change

            //do some sockets magic
            var magic = tickerSymbol + ' hit, % change ' + change
            io.emit('tweet', magic)
        }
    }
}

//percent change function for giving the simulation a value between -10 and 10
var percentChange = function(newValue, prevValue) {

    if (prevValue == 0) {
        return newValue;
    }

    return (newValue - prevValue) / Math.abs(prevValue) * 10;
}


// Simulation ////////////////////////////////////////////////////////////////////////////////////


// simRequire.js
// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------
// object.watch by Eli Grey, http://eligrey.com

if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function(prop, handler) {
            var
                oldval = this[prop],
                getter = function() {
                    return oldval;
                },
                setter = function(newval) {
                    if (oldval !== newval) {
                        handler.call(this, prop, oldval, newval);
                        oldval = newval;
                    } else {
                        return false
                    }
                };
            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        }
    });
}

if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function(prop) {
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


// simSetup.js
// |Trader| Constructor
var Trader = function(assignName, assignStartBal, assignTradeChar) {
    //trader init state
    var self = this;
    this.name = assignName;
    this.balance = assignStartBal;
    this.portfolio = {
        'GOOGL': 1000
    };
    this.history = {
        "buy": [],
        "sell": []
    };
    this.character = assignTradeChar;
    //trade state
    this.lookingForTrade = false;
    this.importance = null;
    this.orderType = null;
    this.offerPrice = null;
    this.offerStock = null;
    //ability to trade
    this.trade = function(tradeType, offer, stock, importance) {
        console.log(this.name + "'s trade sumbitted.")
        this.lookingForTrade = true;
        this.importance = importance;
        this.orderType = tradeType;
        this.offerPrice = offer;
        this.offerStock = stock;
    };
    this.track = function(oldVal, newVal) {
        var role = "";
        var offer = 0;
        //set buyer/seller behavior
        if (assignTradeChar == 'pump') {
            role = 'Buy';
        } else if (assignTradeChar == 'dump') {
            role = 'Sell';
        };
        var importanceVal = 0;
        //buyer trade importance
        if (role == 'Buy' && (newVal < 0)) {
            //neutral
            offer = stockListing.market[0].GOOGL;
            console.log(this.name + " kind of want to " + role + " for $" + offer);
            importanceVal = 0;
        } else if (role == 'Buy' && (newVal >= 0 && newVal < 5)) {
            //desired buy
            offer = stockListing.market[0].GOOGL + 1.25;
            console.log(this.name + " really of want to " + role + " for $" + offer);
            importanceVal = 1;
        } else if (role == 'Buy' && (newVal >= 5 && newVal <= 10)) {
            //desperate buy
            offer = stockListing.market[0].GOOGL + 2.5;
            console.log(this.name + " desperatelly of want to " + role + " for $" + offer);
            importanceVal = 2;
        };
        //seller trade importance
        if (role == 'Sell' && (newVal > 0)) {
            //neutral
            offer = stockListing.market[0].GOOGL;
            console.log(this.name + " kind of want to " + role + " for $" + offer);
            importanceVal = 0;
        } else if (role == 'Sell' && (newVal <= 0 && newVal > -5)) {
            //desired buy
            offer = stockListing.market[0].GOOGL - 1.25;
            console.log(this.name + " really of want to " + role + " for $" + offer);
            importanceVal = 1;
        } else if (role == 'Sell' && (newVal <= -5 && newVal >= -10)) {
            //desperate buy
            offer = stockListing.market[0].GOOGL - 2.5;
            console.log(this.name + " desperatelly of want to " + role + " for $" + offer);
            importanceVal = 2;
        };
        //post the trade
        self.trade(role, offer, 'GOOGL', importanceVal);
    };
};

// |MarketMaker| Constructor
var MarketMaker = function(traders) {
    var self = this;
    this.traderList = traders;
    //using data from this.listen to pass each bot let them set trade
    this.discover = function(oldp, newp) {
        for (var i = 0; i < this.traderList.length; i++) {
            //run though each trader have them track the trend
            console.log(this.traderList[i].name + " now discovering trend.")
            //pass the price data down the line
            this.traderList[i].track(oldp, newp);
        };
    };
    //stages trade between bots
    this.stage = function() {
        var buyer = "";
        var seller = "";
        var pair = [];
        for (var i = 0; i < this.traderList.length; i++) {
            //run though each trader to see if they want to trade
            if (this.traderList[i].lookingForTrade == true && this.traderList[i].orderType == "Buy") {
                buyer = this.traderList[i]
            } else if (this.traderList[i].lookingForTrade == true && this.traderList[i].orderType == "Sell") {
                seller = this.traderList[i]
            };
        };
        pair = [buyer, seller];
        return pair;
    };
    //settle trades between bots
    this.settle = function(pairedUpTraders) {
        console.log("We got ourselves a trade!");
        console.log(pairedUpTraders[0].name + " is buying " + pairedUpTraders[1].name + " is selling");
        var d = new Date();
        //do trade operation 
        console.log("time of trade: " + d);
        var currentPrice = stockListing.market[0].GOOGL;
        var spread = (pairedUpTraders[0].offerPrice - pairedUpTraders[1].offerPrice);
        console.log("Current spread $" + spread);
        var newPrice = (pairedUpTraders[0].offerPrice + pairedUpTraders[1].offerPrice) / 2;
        //determent who the trade favors
        var settleUptonPrice = null;
        if (pairedUpTraders[0].importance > pairedUpTraders[1].importance) {
            // buyer wants it more, seller advantage
            settleUptonPrice = stockListing.market[0].GOOGL + spread;
            console.log("settled price " + settleUptonPrice + " seller advantage.")
        } else if (pairedUpTraders[1].importance > pairedUpTraders[0].importance) {
            // seller wants it more, buyer advantage
            settleUptonPrice = stockListing.market[0].GOOGL - spread;
            console.log("settled price " + settleUptonPrice + " buyer advantage.")
        } else {
            // importance is matching no advantage
            settleUptonPrice = stockListing.market[0].GOOGL;
            console.log(settleUptonPrice + " even trade.")
        };
        // money change hands
        pairedUpTraders[0].balance = pairedUpTraders[0].balance - settleUptonPrice;
        pairedUpTraders[1].balance = pairedUpTraders[1].balance + settleUptonPrice;
        //console.log("buyer balance: " + pairedUpTraders[0].balance, "seller balance: " +pairedUpTraders[1].balance)
        //take stock from seller give to buyer
        pairedUpTraders[0].portfolio.GOOGL = pairedUpTraders[0].portfolio.GOOGL + 1;
        pairedUpTraders[1].portfolio.GOOGL = pairedUpTraders[1].portfolio.GOOGL - 1;
        //reset trade state
        stockListing.market[0].GOOGL = newPrice;
        for (var t = 0; t < 2; t++) {
            pairedUpTraders[t].lookingForTrade = false;
            pairedUpTraders[t].importance = null;
            pairedUpTraders[t].orderType = null;
            pairedUpTraders[t].offerPrice = null;
            pairedUpTraders[t].offerStock = null;
        };
        // push to JSON
        var t = new Date().getTime();
        var newTrade = {
            "buyer": pairedUpTraders[0].name,
            "seller": pairedUpTraders[0].name,
            "timeOfTrade": t,
            "price": stockListing.market[0].GOOGL,
            "stock": 'GOOGL'
        };
        tradeLedger.trades.push(newTrade);
        console.log('>> >> >> >> $GOOGL current price: ' + stockListing.market[0].GOOGL + ' << << << <<');

    };
    this.service = function() {
        //listen to see any changes happend on twitterTrend
        twitterTrend.watch("GOOGL", function(id, oldval, newval) {
            //obj.watch works only on one obj at a time.
            console.log("tracking stock... (" + oldval + ") :pastTrend, (" + newval + ") :lastestTrend");
            self.discover(oldval, newval);
            //stage a trade
            var pairedTraders = self.stage();
            //console.log(pairedTraders);
            //settle a trade btw 2 traders
            self.settle(pairedTraders);
        });
    };
};
/*
    Bot charactistics:
        pump: always try to buy
        dump: always try to sell
*/

//sim.js goes here?
//Sim.js
//{tradeLedger} JSON Obj, stores everytrade
var tradeLedger = {
    "trades": [{
        "buyer": "Bot1",
        "seller": "Bot2",
        "timeOfTrade": 1439254635102,
        "price": 50,
        "stock": 'GOOGL'
    }]
};
//{stockListing} JSON obj, stores the current value of stock
var stockListing = {
    "market": [{
        "GOOGL": 500
    }]
};
//{twitterTrend} basic obj, updates via twitter API
var twitterTrend = {
    "GOOGL": 0
};

//set test variable enviroment
var tweetCounter = 0;
var bot1 = new Trader('R2D2', 3000000, 'pump');
var bot2 = new Trader('C3PO', 1000000, 'dump');
var marketMakerBot = new MarketMaker([bot1, bot2]);
marketMakerBot.service();


twitterTrend.GOOGL = 0;


