var models = require('../models');

module.exports.controller = function (app) {

	// COMPANIES ALL
	app.get('/api/companies/', function (req, res) {
		models.companies.findAll().then(function (result) {
			res.json(result);
		});
	});

	// COMPANY SHOW WITH THE BOTS THAT IT EMPLOYS
	app.get('/api/companies/:id', function (req, res) {
		models.companies.findOne({ where: {id: req.params.id}, include: [models.bots]}).then(function (result) {
			res.json(result)
		});
	});

	// COMPANY UPDATE
	app.put('/api/companies/:id', function (req, res) {
		models.companies.findById( req.params.id ).then(function (result) {
	    	result.update( req.body ).then(function (updatedResult) {
	            res.json(updatedResult);
	        });
	    });
	});	
}