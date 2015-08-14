var sentiment = require('sentiment');
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
    var dataChanges = [];
    //console.log('process hit')
    console.log(tweet.text)

    //grab the symbol names in the symbols obj
    var trendKeys = Object.keys(trends)


    //loop through the keys, look to see if the key is in the tweet
    for (var i = 0; i < trendKeys.length; i++) {
        var tickerSymbol = '$' + trendKeys[i];
        var tickerSymbolUp = '$' + trendKeys[i].toUpperCase();

        if (tweet.text.indexOf(tickerSymbol) > -1 || tweet.text.indexOf(tickerSymbolUp) > -1) {

            //increase the count
            trends[trendKeys[i]].count += 1;

            //grab the sentiment
            var tweetSentiment = sentiment(tweet.text);

            //current sentiment
            var currentSentiment = trends[trendKeys[i]].attitude

            //new sentiment
            var newSentiment = currentSentiment + tweetSentiment.score

            var change = newSentiment - currentSentiment;
            // DEBUGGING BLOCK
            // console.log("score type " + typeof tweetSentiment.score + " " + tweetSentiment.score)
            //  console.log("current type " + typeof currentSentiment + " " + currentSentiment)
            // console.log("new type " + typeof newSentiment + " " + newSentiment)

            //calculate % change
            var pchange = 0;
            if (currentSentiment == 0) {
                pchange = newSentiment;
            } else {
                pchange = change / Math.abs(currentSentiment) * 10;
            }

            //change the attitude according to the returned sentiment socre
            trends[trendKeys[i]].attitude = newSentiment

            console.log(tickerSymbol + ' hit, % change ' + change)
            console.log(trends[trendKeys[i]])

            //sim = change; //this isn't working

            //we cant use return here, will exit the function
            //use an array of the changes instead and return outside the for block?

            //or add emit to the sockets.io. totally untested in the module format
            dataChanges.push({
               symbol: tickerSymbol,
               count: trends[trendKeys[i]].count,
               attitude: trends[trendKeys[i]].attitude,
               change: change,
               pchange: pchange
            })
        }
    }
    tweet.changes = dataChanges;
    return tweet;
}


// MODULE EXPORTS //////////////////////////////////////////////////////////////////////////
module.exports.process = process;
module.exports.trends = trends;