App.Models.TestModel = Backbone.Model.extend({

	urlRoot: '/api/index',
	tagName: 'div',

	initialize: function () {
		console.log("new testModel created")
	}

})