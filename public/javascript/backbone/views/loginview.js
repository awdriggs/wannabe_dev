App.Views.LoginView = Backbone.View.extend({

	el: '#input_ui',

	initialize: function () {
		console.log('single login view created');
		this.template = Handlebars.compile($('#logintemplate').html());
		this.render();
	},

	render: function () {
		this.$el.append(this.template());
	}

})