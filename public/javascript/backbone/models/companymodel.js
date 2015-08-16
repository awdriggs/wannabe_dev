App.Models.Company = Backbone.Model.extend({

	urlRoot: '/api/companies',
	tagName: 'div',

	initialize: function () {
		console.log('Company model created');
	}

})