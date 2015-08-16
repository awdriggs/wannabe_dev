App.Models.Bot = Backbone.Model.extend({

	urlRoot: '/api/bots',
	tagName: 'div',

	initialize: function () {
		console.log('Bot model created');
	}

})