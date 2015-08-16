App.Views.StockView = Backbone.View.extend({

	initialize: function () {
		console.log('single stock view created');
		this.template = Handlebars.compile($('#stocktemplate').html());
		this.listenTo(this.model, 'change', this.renderUpdate);
		this.render();
	},

	render: function () {
		this.$el.append(this.template(this.model.toJSON()));
	},

	renderUpdate: function () {
		console.log('render updated stock model')
		this.$el.html(this.template(this.model.toJSON()));
	}

})