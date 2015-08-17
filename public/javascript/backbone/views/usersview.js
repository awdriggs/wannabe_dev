App.Views.UsersView = Backbone.View.extend({

	el: '#container',

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

	events: {
		'click a': 'show'
	},

	show: function (e) {
		// remove the click event from the el so other views cannot click and get these results
		this.$el.off('click', 'a');
		e.preventDefault();
		self = this;

		var id = $(e.currentTarget).data("id");

		console.log('id: ', id)

		usermodel = new App.Models.User;
	    usermodel.set('id', id);
		usermodel.fetch().done(function (result) {
			console.log('free user fetched');

			var botCollection = [];

			for (i=0; i < usermodel.attributes.bots.length; i++) {
				var botname = usermodel.attributes.bots[i].botname,
					balance = usermodel.attributes.bots[i].balance,
					id = usermodel.attributes.bots[i].id,
					stock = usermodel.attributes.bots[i].stockinterest,
					quantity = usermodel.attributes.bots[i].quantity,
					character = usermodel.attributes.bots[i].character,
					risk = usermodel.attributes.bots[i].risktolerance,
					step = usermodel.attributes.bots[i].stepsize,
					attitude = usermodel.attributes.bots[i].attitude;
				// Push a single object into a the collection array
				botCollection.push({id: id, botname: botname, balance: balance, stockinterest: stock, quantity: quantity, character: character, risktolerance: risk, stepsize: step, attitude: attitude})
			}

			console.log(botCollection);

			self.$el.empty();
			// View the single model originally clicked
			var view = new App.Views.UserAssocView({model: usermodel});

			var botgrab = new Backbone.Collection(botCollection);

			var botview = new App.Views.BotsAssocView({collection: botgrab});

		}); // end done fetch
	} // end show function

})