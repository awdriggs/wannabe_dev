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
var SIM = require('./stockMarketSim_folder/sim.js');
var trend = require('./stockMarketSim_folder/sim.js').trend;
// starts the simulation a.k.a the humancentipad
SIM();
console.log(trend.twitterAPI);
trend.twitterAPI = 1;

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


var twitterModule = require('./twitter_module');

var tweetArray = [];

//this connects the server to the twitter api
client.stream('statuses/filter', {
    track: '$goog, $aapl, $fb, $amzm, $twtr, $msft'
}, function(stream) {
    stream.on('data', function(tweet) {
    	console.log('stream')
        //calles the process function in the twitter module. better way to handle trends which is in the same file?
        //twitterModule.process(tweet.text)

        //do the emiting here?
        //io.emit
        var info = twitterModule.process(tweet) //this function returns the original tweet with an array of changes attached.
        console.log(info.changes) //this is an array of all the changes that happpened with a tweet

            //write some logic to show the last ten tweets
            
            trend.twitterAPI = info.changes[0].pchange;
            io.emit('tweet', tweet)
            //console.log(tweet) //will print tweet json
    })
})

app.get('/search_test', function(req, res) {
    client.get('search/tweets', {
        q: '$GOOG', count: 100
    }, function(error, tweets, response) {
        res.send(tweets);
    });
})



