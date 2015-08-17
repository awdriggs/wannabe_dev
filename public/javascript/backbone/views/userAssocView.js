App.Views.UserAssocView = Backbone.View.extend({

	el: '#container',

	initialize: function () {
		console.log('associative user view created');
		this.template = Handlebars.compile($('#usertemplate').html());
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},

	render: function () {
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.attr('class', 'item');
	}

})