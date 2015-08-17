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

	show: function (e) {
		// remove the click event from the el so other views cannot click and get these results
		this.$el.off('click', 'a');
		e.preventDefault();

		var id = $(e.currentTarget).data("id");

		console.log('id: ', id)

		companymodel = new App.Models.Company;
	    companymodel.set('id', id);
		companymodel.fetch().done(function (result) {
			console.log('free company fetched');

			var botCollection = [];

			for (i=0; i < companymodel.attributes.bots.length; i++) {
				var botname = companymodel.attributes.bots[i].botname,
					balance = companymodel.attributes.bots[i].balance,
					id = companymodel.attributes.bots[i].id,
					stock = companymodel.attributes.bots[i].stockinterest,
					quantity = companymodel.attributes.bots[i].quantity,
					character = companymodel.attributes.bots[i].character,
					risk = companymodel.attributes.bots[i].risktolerance,
					step = companymodel.attributes.bots[i].stepsize,
					attitude = companymodel.attributes.bots[i].attitude;
				// Push a single object into a the collection array
				botCollection.push({id: id, botname: botname, balance: balance, stockinterest: stock, quantity: quantity, character: character, risktolerance: risk, stepsize: step, attitude: attitude})
			}

			console.log(botCollection);

			var botgrab = new Backbone.Collection(botCollection);

			var botview = new App.Views.BotsAssocView({collection: botgrab});

		}); // end done fetch
	} // end show function

})