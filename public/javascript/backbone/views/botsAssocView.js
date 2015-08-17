App.Views.BotsAssocView = Backbone.View.extend({

	// el: '#bots-container',
	el: '#container',
	
	initialize: function () {
		reset: true,
		console.log('Bots associative view created');
		this.listenTo(this.collection, 'reset', this.renderAll)
		this.renderAll();
	},

	renderAll: function () {
		this.collection.each(this.renderOne, this)
	},

	renderOne: function (bot) {
		var viewthis = new App.Views.BotView({ model: bot });
		this.$el.append(viewthis.el);
	},

})