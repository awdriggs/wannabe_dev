App.Views.UsersView = Backbone.View.extend({

	el: '#users-container',

	initialize: function () {
		console.log('Users view created');
		this.listenTo(this.collection, 'reset', this.renderAll)
	},

	renderAll: function () {
		this.$el.empty();
		this.collection.each(this.renderOne, this)
	},

	renderOne: function (user) {
		var viewthis = new App.Views.UserView({ model: user });
		this.$el.append(viewthis.el);
	},

})