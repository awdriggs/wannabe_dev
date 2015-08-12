App.Models.UserModel = Backbone.Model.extend({

	urlRoot: '/api/users/index',
	tagName: 'div',

	initialize: function () {
		console.log("new User model created")
	}

})