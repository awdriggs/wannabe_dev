App.Collections.UsersCollection = Backbone.Collection.extend({

	url: '/api/users/index',
	model: App.Models.TestModel,

	initialize: function () {
		console.log('new test collection created');
	}

})