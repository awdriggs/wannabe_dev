var express = require('express');
var app = express();
var logger = require('morgan');
var path = require('path');
var Twitter = require('twitter');
var dotter = require('dotenv').load();
var sentiment = require('sentiment');

app.listen(3000);

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

//this connections the server to the twitter api
//will this cause problems in the future?
client.stream('statuses/filter', {
    track: '$goog, $aapl, $baba, $fb, $amzm, $twtr, $msft'
}, function(stream) {
    stream.on('data', function(tweet) {
        log(tweet.text);
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
            console.log(tickerSymbol + 'hit')
            //increase the count
            trends[trendKeys[i]].count += 1;
            
            //grab the sentiment
            var tweetSentiment = sentiment(tweet);

            //change the attitude according to the returned sentiment socre
            trends[trendKeys[i]].attitude += tweetSentiment.score
        }   
    }

    //for dev, see whats inside trends
    console.log(trends);
}