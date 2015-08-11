App.Views.TestView = Backbone.View.extend({

	el: '#app',

	initialize: function () {
		console.log('Test view created')
		this.template = Handlebars.compile($('#testTemplate').html())
		this.listenTo(this.model, 'change', this.render)
	},

	render: function () {
		console.log('render')
		this.$el.append(this.template(this.model.toJSON()))
	}

})