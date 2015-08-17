App.Views.CompaniesView = Backbone.View.extend({

	el: '#companies-container',

	initialize: function () {
		console.log('Companies view created');
		this.listenTo(this.collection, 'reset', this.renderAll)
	},

	renderAll: function () {
		this.$el.empty();
		this.collection.each(this.renderOne, this)
	},

	renderOne: function (company) {
		var viewthis = new App.Views.CompanyView({ model: company });
		this.$el.append(viewthis.el);
		this.$el.attr('class', 'item');
	},

	events: {
		'click a': 'show'
	},

	show: function () {
		// remove the click event from the el so other views cannot click and get these results
		this.$el.off('click', 'a');
		e.preventDefault();
	}

})