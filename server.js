// DEPENDENCIES
var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	path = require('path'),
	logger = require('morgan'),
	fs = require('fs'),
	session = require('express-session');

var app = express();

// LISTENER
app.listen(3000);

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


// ROUTES

// Root
app.get('/', function (req, res){
	res.sendfile('./public/index.html');
});


// Session
app.get('/session', function (req, res) {
	if (req.session.name) {
		res.send(req.session);
	} else {
		res.send('no session');
	}
})

app.post('/setuser', function (req, res) {
	req.session.name = req.body.name;
	res.send('Session set for ' + req.session.name);
})

app.delete('/removeuser', function (req, res) {
	req.session.name = null
	res.redirect('/session')
})


// API Index
app.get('/api/index', function (req, res) {
	var data = {
		teamName: "Wannabe",
		projectName: "StockBot"
	}
	res.json(data);
});

app.get('/api/bots/index', function (req, res) {
	res.send('bots index');
});

app.get('/api/users/index', function (req, res) {
	res.send('users index');
});

app.get('/api/stocks/index', function (req, res) {
	res.send('stocks index');
});

app.get('/api/trades', function (req, res) {
	res.send('trades index');
})


// API Save

app.post('/api/bots/create', function (req, res) {
	res.send('bots create');
});

app.post('/api/users/create', function (req, res) {
	res.send('users create');
});


// api Delete

app.delete ('/api/bots/delete', function (req, res) {
	res.send('bots delete');
});

app.delete('/api/users/delete', function (req, res) {
	res.send('users delete');
})







