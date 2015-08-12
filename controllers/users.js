var models = require('../models');

module.exports.controller = function (app) {

	app.get('/api/users/index', function (req, res) {
		models.users.findAll().then(function (result) {
			res.json(result);
		});
	});

	app.post('/api/users/create', function (req, res) {
		res.send('users create');
	});

	app.put('/api/users/update', function (req, res) {
		res.send('users update');
	});

	app.delete('/api/users/delete', function (req, res) {
		res.send('users delete');
	});

}