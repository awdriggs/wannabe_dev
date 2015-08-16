var models = require('../models');

module.exports.controller = function (app) {

	// STOCKS ALL
	app.get('/api/stocks/', function (req, res) {
		models.stocks.findAll().then(function (result) {
			res.json(result);
		});
	});

	// STOCK SHOW WITH THE BOTS THAT TRADE IT
	app.get('/api/stocks/:id', function (req, res) {
		models.stocks.findOne({ where: {id: req.params.id}, include: [models.bots]}).then(function (result) {
			res.json(result)
		});
	});

	// STOCK UPDATE
	app.put('/api/stocks/:id', function (req, res) {
		models.stocks.findById( req.params.id ).then(function (result) {
	    	result.update( req.body ).then(function (updatedResult) {
	            res.json(updatedResult);
	        });
	    });
	});	
}