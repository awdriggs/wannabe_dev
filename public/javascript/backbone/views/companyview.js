App.Views.CompanyView = Backbone.View.extend({

	// el: '#container',
	
	initialize: function () {
		console.log('single company view created');
		this.template = Handlebars.compile($('#companytemplate').html());
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},

	render: function () {
		this.$el.append(this.template(this.model.toJSON()));
	}

})