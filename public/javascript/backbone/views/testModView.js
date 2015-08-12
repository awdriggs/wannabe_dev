App.Views.TestModView = Backbone.View.extend({

	el: '#app',

	initialize: function () {
		console.log('Test Model view created')
		this.template = Handlebars.compile($('#testTemplate').html())
		this.listenTo(this.model, 'change', this.render)
		this.render();
	},

	render: function () {
		this.$el.append(this.template(this.model.toJSON()));
	}

})