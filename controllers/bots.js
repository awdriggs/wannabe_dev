var models = require('../models');

module.exports.controller = function (app) {

	// BOTS INDEX
	app.get('/api/bots/', function (req, res) {
		models.bots.findAll().then(function (result) {
			res.json(result);
		});
	});

	// BOT CREATE
	app.post('/api/bots/create', function (req, res) {
		models.bots.create( req.body ).then(function (result) {
			res.json(result);
		});
	});

	// BOT SHOW AND THE COMPANY OR USER IT BELONGS TO AND THE STOCK IT OWNS
	app.get('/api/bots/:id', function (req, res) {
		models.bots.findOne( { where: { id: req.params.id  }, include: [models.users, models.companies, models.stocks] }).then(function (result) {
			res.json(result);
		});
	});

	// BOT UPDATE
	app.put('/api/bots/:id', function (req, res) {
	    models.bots.findById( req.params.id ).then(function (result) {
	    	result.update( req.body ).then(function (updatedResult) {
	            res.json(updatedResult);
	        });
	    });
	});

	// BOT DELETE
	app.delete ('/api/bots/:id', function (req, res) {
		models.bots.findById( req.params.id ).then(function (result) {
			result.destroy();
			res.json(result);
		});
	});

}