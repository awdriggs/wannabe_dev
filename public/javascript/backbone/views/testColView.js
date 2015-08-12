App.Views.TestColView = Backbone.View.extend({

	el: '#app',

	initialize: function () {
		console.log('Test view created')
		this.template = Handlebars.compile($('#testTemplate').html())
		this.listenTo(this.collection, 'reset', this.renderAll)
	},

	renderAll: function () {
		this.collection.each(this.renderOne, this)
	},

	renderOne: function (stock) {
		var testView = new App.Views.TestModView({model: stock});
		this.$el.append(testView.el);
	},

})