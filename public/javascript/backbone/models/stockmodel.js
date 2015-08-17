App.Models.Stock = Backbone.Model.extend({

	urlRoot: '/api/stocks',
	tagName: 'div',

	initialize: function () {
		console.log('stock model created');
	}

})