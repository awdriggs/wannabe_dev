module.exports.controller = function (app) {

	//ROOT
	app.get('/', function (req, res) {
		res.sendfile('/index.html')
	});

}