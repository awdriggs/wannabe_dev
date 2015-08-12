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
		res.send('Session set for ' + req.session.name);
	});

	app.delete('/removeuser', function (req, res) {
		req.session.name = null
		res.redirect('/session');
	});

}