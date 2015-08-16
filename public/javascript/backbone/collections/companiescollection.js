App.Collections.Companies = Backbone.Collection.extend({

	url: '/api/companies',
	model: App.Models.Company,

	initialize: function() {
		console.log('Companies collection created');
	}

})