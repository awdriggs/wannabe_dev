App.Views.TestColView = Backbone.View.extend({

	el: '#app',

	initialize: function () {
		console.log('Test Collection view created')
		this.template = Handlebars.compile($('#testTemplate').html())
		this.listenTo(this.collection, 'reset', this.renderAll)
	},

	renderAll: function () {
		this.collection.each(this.renderOne, this)
	},

	renderOne: function (user) {
		var testView = new App.Views.TestModView({model: user});
		this.$el.append(testView.el);
	},

})