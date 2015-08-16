App.Collections.Bots = Backbone.Collection.extend({

	url: '/api/bots',
	model: App.Models.Bot,

	initialize: function() {
		console.log('bot collection created');
	}

})