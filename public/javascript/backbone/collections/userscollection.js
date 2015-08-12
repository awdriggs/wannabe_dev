App.Collections.UsersCollection = Backbone.Collection.extend({

	url: '/api/users/index',
	model: App.Models.UserModel,

	initialize: function () {
		console.log('new Users collection created');
	}

})