var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');
var Twitter = require('twitter');

var dotter = require('dotenv').load();

app.listen(3000);

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: 'handlebars'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));
app.use(logger('dev'));

app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

var client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.TOKEN_KEY,
    access_token_secret: process.env.TOKEN_SECRET
});


// ROUTES ////////////////////////////////////////////////////////////////////////////////////

// HOME

//get all the tweets from a specified user
app.get('/', function(req, res) {

    var params = {
        screen_name: 'nodejs'
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            res.send(tweets);
        }
    });


});


//post a tweet through node
app.get('/post_test', function(req, res) {
    client.post('statuses/update', {
        status: 'I Love Twitter'
    }, function(error, tweet, response) {
        if (error) throw error;
        console.log(tweet); // Tweet body. 
        console.log(response); // Raw response object. 
    });
})

//get a stream through node
app.get('/stream_test', function(req, res) {
    client.stream('statuses/filter', {
        track: 'javascript'
    }, function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            res.send(tweet)
        });

        stream.on('error', function(error) {
            throw error;
            res.send(error)
        });
    });
})

//get a search
app.get('/search_test', function(req, res) {
    client.get('search/tweets', {
        q: '$GOOG', count: 100
    }, function(error, tweets, response) {
        res.send(tweets);
    });
})

//possible logic
//
//do a search for a particular stock ticker
//count the number of tweets since the last search request
//store the id of the most recent tweet for the next wearch

//the count is the way see how popular a tweet is
//the twitter trend shit only returns the hashtags for a certain geolocal, no dice.


