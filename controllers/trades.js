var models = require('../models');

module.exports.controller = function (app) {

	app.get('/api/trades/index', function (req, res) {
		res.send('trades index');
	});

	app.post('/api/trades/create', function (req, res) {
		res.send('trades create');
	});

	app.put('/api/trades/update', function (req, res) {
		res.send('trades update');
	});
		
}