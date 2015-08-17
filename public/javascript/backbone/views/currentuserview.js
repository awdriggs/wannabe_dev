App.Views.CurrentUserView = Backbone.View.extend({
	el: '#edit_area',

	initialize: function () {
		console.log('single login view created');
		this.template = Handlebars.compile($('#newbottemplate').html());
		this.render();
	},

	render: function () {
		this.$el.append(this.template());
	}
})