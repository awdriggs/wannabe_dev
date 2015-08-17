App.Views.StocksView = Backbone.View.extend({

	el: '#container',

	initialize: function () {
		console.log('Stocks view created');
		this.listenTo(this.collection, 'reset', this.renderAll)
	},

	renderAll: function () {
		this.$el.empty();
		this.collection.each(this.renderOne, this)
	},

	renderOne: function (stock) {
		var viewthis = new App.Views.StockView({ model: stock });
		this.$el.append(viewthis.el);
	},
	events: {
		'click a': 'show'
	},

	show: function (e) {
		// remove the click event from the el so other views cannot click and get these results
		this.$el.off('click', 'a');
		e.preventDefault();

		// Show all bots related to this stock through db associations.
		// We grab the model from the urlRoot of the model, instead of from the collection url. This
		// will give us its associations as delivered by the route '/stocks/:id'. Associations
		// are made in Sequelize and gathered within the route.

		// Takes the id from the target's data-id to find the individual stock model:
		var id = $(e.currentTarget).data("id");

		// Makes a new stock model with the id and fetches it from the db through urlRoot:
		stockmodel = new App.Models.Stock;
		stockmodel.set('id', id);
		stockmodel.fetch().done(function (result) {

			// This is an array to store the (one-to-many) associations of related bots that own the original stock
			var botCollection = []

			// Loop over the json bots now within stockmodel and create temporary objects
			// to make a new collection
			for (i=0; i < stockmodel.attributes.bots.length; i++) {
				var botname = stockmodel.attributes.bots[i].botname,
					balance = stockmodel.attributes.bots[i].balance,
					id = stockmodel.attributes.bots[i].id,
					stock = stockmodel.attributes.bots[i].stockinterest,
					quantity = stockmodel.attributes.bots[i].quantity,
					character = stockmodel.attributes.bots[i].character,
					risk = stockmodel.attributes.bots[i].risktolerance,
					step = stockmodel.attributes.bots[i].stepsize,
					attitude = stockmodel.attributes.bots[i].attitude;
				// Push a single object into a the collection array
				botCollection.push({id: id, botname: botname, balance: balance, stockinterest: stock, quantity: quantity, character: character, risktolerance: risk, stepsize: step, attitude: attitude})
			}

			// View the single stock originally clicked
			// var view = new App.Views.StockView({model: stockmodel});

			// Make the collection with the array of associated objects
			var botgrab = new Backbone.Collection(botCollection);
			// Pass the free collection to a view (different from BotsView to avoid doubled information)
			// This is appended to the el, will the original stock info instact.
			var botview = new App.Views.BotsAssocView({collection: botgrab});
			
		});	
	} // end show function

})