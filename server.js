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


// ROUTES

// Root
app.get('/', function (req, res){

	res.sendfile('./public/index.html')
})



// api
app.get('/api/index', function (req, res) {
	var data = {
		teamName: "Wannabe",
		projectName: "StockBot"
	}
	res.json(data)
})