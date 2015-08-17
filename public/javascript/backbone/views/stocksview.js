App.Views.StocksView = Backbone.View.extend({

	el: '#container',

	initialize: function () {
		console.log('Stocks view created');
		this.listenTo(this.collection, 'reset', this.renderAll)
		this.listenTo(this.collection, 'change', this.renderAll)
	},

	renderAll: function () {
		this.$el.empty();
		this.collection.each(this.renderOne, this)
	},

	renderOne: function (stock) {
		var viewthis = new App.Views.StockView({ model: stock });
		this.$el.append(viewthis.el);
	},

})