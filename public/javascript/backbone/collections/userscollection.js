App.Collections.Users = Backbone.Collection.extend({

	url: '/api/users',
	model: App.Models.User,

	initialize: function() {
		console.log('Users collection created');
	}

})