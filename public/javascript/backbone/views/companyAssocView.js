App.Views.CompanyAssocView = Backbone.View.extend({

	el: '#companies-container',

	initialize: function () {
		console.log('associative company view created');
		this.template = Handlebars.compile($('#companytemplate').html());
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},

	render: function () {
		this.$el.append(this.template(this.model.toJSON()));
		this.$el.attr('class', 'item');
	}

})
