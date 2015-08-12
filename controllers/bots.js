var models = require('../models');

module.exports.controller = function (app) {

	app.get('/api/bots/index', function (req, res) {
		res.send('bots index');
	});

	app.post('/api/bots/create', function (req, res) {
		res.send('bots create');
	});

	app.put('/api/bots/update', function (req, res) {
		res.send('bots update');
	});

	app.delete ('/api/bots/delete', function (req, res) {
		res.send('bots delete');
	});

}