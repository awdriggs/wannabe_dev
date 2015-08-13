var sentiment = require('sentiment');
var sim = require('./simulation.js').simTrend;
console.log(sim);

trends = {
    "goog": {
        count: 0,
        attitude: 0
    },
    "aapl": {
        count: 0,
        attitude: 0
    },
    "fb": {
        count: 0,
        attitude: 0
    },
    "amzn": {
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

var process = function(tweet) {

    //console.log('process hit')
    console.log(tweet)

    //grab the symbol names in the symbols obj
    var trendKeys = Object.keys(trends)


    //loop through the keys, look to see if the key is in the tweet
    for (var i = 0; i < trendKeys.length; i++) {
        var tickerSymbol = '$' + trendKeys[i];
        var tickerSymbolUp = '$' + trendKeys[i].toUpperCase();

        if (tweet.indexOf(tickerSymbol) > -1 || tweet.indexOf(tickerSymbolUp) > -1) {

            //increase the count
            trends[trendKeys[i]].count += 1;

            //grab the sentiment
            var tweetSentiment = sentiment(tweet);

            //current sentiment
            var currentSentiment = trends[trendKeys[i]].attitude

            //new sentiment
            var newSentiment = currentSentiment + tweetSentiment.score

            // DEBUGGING BLOCK
            // console.log("score type " + typeof tweetSentiment.score + " " + tweetSentiment.score)
            //  console.log("current type " + typeof currentSentiment + " " + currentSentiment)
            // console.log("new type " + typeof newSentiment + " " + newSentiment)

            //calculate % change
            var change = 0;
            if (currentSentiment == 0) {
                change = newSentiment;
            } else {
                change = (newSentiment - currentSentiment) / Math.abs(currentSentiment) * 10;
            }

            //change the attitude according to the returned sentiment socre
            trends[trendKeys[i]].attitude = newSentiment

            console.log(tickerSymbol + ' hit, % change ' + change)
            console.log(trends[trendKeys[i]])

            sim = change;
            //we cant use return here, will exit the function
            //use an array of the changes instead and return outside the for block?

            //or add emit to the sockets.io. totally untested in the module format

        }
    }
}


// MODULE EXPORTS //////////////////////////////////////////////////////////////////////////
module.exports.process = process;
module.exports.trends = trends;