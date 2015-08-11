App.Models.TestModel = Backbone.Model.extend({

	urlRoot: '/api/index',

	initialize: function () {
		console.log("new testModel created")
	}

})