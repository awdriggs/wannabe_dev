var models = require('../models');

module.exports.controller = function (app) {

	// USERS ALL
	app.get('/api/users', function (req, res) {
		models.users.findAll().then(function (result) {
			res.json(result);
		});
	});

	// USER SHOW WITH THE BOTS HE OR SHE OWNS
	app.get('/api/users/:id', function (req, res) {
		models.users.findOne({ where: {id: req.params.id}, include: [models.bots]}).then(function (result) {
			res.json(result);
		})
	})

	// USER CREATE
	app.post('/api/users/create', function (req, res) {
		models.users.create( req.body ).then(function (result) {
			res.json(result);
		});
	});

	// USER UPDATE
	app.put('/api/users/:id', function (req, res) {
		models.users.findById( req.params.id ).then(function (result) {
	    	result.update( req.body ).then(function (updatedResult) {
	            res.json(updatedResult);
	        });
	    });
	});

	// USER DELETE
	app.delete('/api/users/:id', function (req, res) {
		models.users.findById( req.params.id ).then(function (result) {
			result.destroy();
			res.json(result);
		});
	});

}