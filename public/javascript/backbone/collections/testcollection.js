App.Collections.TestCollection = Backbone.Collection.extend({

	url: '/api/index',
	model: App.Models.TestModel,

	initialize: function () {
		console.log('new test collection created');
	}

})