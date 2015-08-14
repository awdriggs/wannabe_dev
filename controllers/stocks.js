var models = require('../models');

module.exports.controller = function (app) {

	app.get('/api/stocks/index', function (req, res) {
		models.stocks.findAll().then(function (result) {
			res.json(result);
		});
	});

	app.put('/api/stocks/update/:id', function (req, res) {
		models.stocks.findById( req.params.id ).then(function (result) {
	    	result.update( req.body ).then(function (updatedResult) {
	            res.json(updatedResult);
	        });
	    });
	});
	
}