var models = require('../models');

module.exports.controller = function (app) {

	app.get('/api/stocks/index', function (req, res) {
		res.send('stocks index');
	});

	app.put('/api/stocks/update', function (req, res) {
		res.send('stocks update');
	});

}