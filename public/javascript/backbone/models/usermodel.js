App.Models.User = Backbone.Model.extend({

	urlRoot: '/api/users',
	tagName: 'div',

	initialize: function () {
		console.log('User model created');
	}

})