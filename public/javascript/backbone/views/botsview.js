App.Views.BotsView = Backbone.View.extend({

	el: '#container',

	initialize: function () {
		console.log('Bots view created');
		this.listenTo(this.collection, 'reset', this.renderAll)
	},

	renderAll: function () {
		this.$el.empty();
		this.collection.each(this.renderOne, this)
	},

	renderOne: function (bot) {
		var viewthis = new App.Views.BotView({ model: bot });
		this.$el.append(viewthis.el);
	},

})