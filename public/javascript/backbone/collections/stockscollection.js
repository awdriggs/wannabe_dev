App.Collections.Stocks = Backbone.Collection.extend({

	url: '/api/stocks',
	model: App.Models.Stock,

	initialize: function() {
		console.log('stock collection created');
	}

})