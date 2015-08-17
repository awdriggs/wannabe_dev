App.Views.CurrentUserInfoView = Backbone.View.extend({
	el: '#input_ui',

	initialize: function () {
		console.log('current user info view created');
		this.template = Handlebars.compile($('#current_user').html());
		this.render();
	},

	render: function () {
		this.$el.append(this.template());
	}
})