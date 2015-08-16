module.exports.controller = function (app) {

	app.get('/session', function (req, res) {
		if (req.session.name) {
			res.send(req.session);
		} else {
			res.send('no session');
		}
	});

	app.post('/setuser', function (req, res) {
		req.session.name = req.body.name;
		//res.json(req.session.name);
		// models.users.findOne({ where: {id: req.params.id}, include: [models.bots]}).then(function (result) {
		// 	res.json(result);
		// })
		res.redirect('/');
	});

	app.delete('/removeuser', function (req, res) {
		req.session.name = null
		res.redirect('/session');
	});

}