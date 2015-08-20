App.Views.CurrentUserView = Backbone.View.extend({
	//el: '#edit_area',
	el: '#input_ui', //change this back to the above code when having user sesions.
	initialize: function () {
		console.log('single login view created');
		this.template = Handlebars.compile($('#newbottemplate').html());
		this.render();
	},

	render: function () {
		this.$el.append(this.template());
	}
})