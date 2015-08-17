App.Views.BotAssocView = Backbone.View.extend({

	el: '#container',

	initialize: function () {
		console.log('associative bot view created');
		this.template = Handlebars.compile($('#singlebottemplate').html());
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},

	render: function () {
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.attr('class', 'item');
	}

})