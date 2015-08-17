App.Views.UserView = Backbone.View.extend({

	initialize: function () {
		console.log('single user view created');
		this.template = Handlebars.compile($('#usertemplate').html());
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},

	render: function () {
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.attr('class', 'item');
	}

})