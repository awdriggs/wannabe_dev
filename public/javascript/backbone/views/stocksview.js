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
		e.preventDefault();
		self = this;

		// Takes the id from the target's data-id to find the individual stock model
		var id = $(e.currentTarget).data("id");

		// Makes a new stock model with the id and fetches it from the db
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
					id = stockmodel.attributes.bots[i].id;
				// Push a single object into a the collection array
				botCollection.push({id: id, botname: botname, balance: balance})
			}

			self.$el.empty();

			// View the single stock originally clicked
			view = new App.Views.StockView({model: stockmodel});
			// Make the collection with the array of associated objects
			botgrab = new Backbone.Collection(botCollection);
			// Pass the free collection to an view (different from BotsView to avoid doubled information)
			botview = new App.Views.BotsAssocView({collection: botgrab});
			
		});	
	} // end show function

})