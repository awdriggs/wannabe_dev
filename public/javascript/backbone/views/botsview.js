App.Views.BotsView = Backbone.View.extend({

	el: '#bots-container',

	initialize: function () {
		console.log('Bots view created');
		this.listenTo(this.collection, 'reset', this.renderAll)
	},

	renderAll: function () {
		this.$el.empty();
		this.collection.each(this.renderOne, this)
	},

	renderOne: function (bot) {
		var viewthis = new App.Views.BotView({ model: bot });
		this.$el.append(viewthis.el);
		
	},

	events: {
		'click a': 'show'
	},

	show: function (e) {
		console.log('clicked show');

		this.$el.off('click', 'a');
		e.preventDefault();

		var id = $(e.currentTarget).data("id");

		console.log('id: ', id);

		botmodel = new App.Models.Bot;
		botmodel.set('id', id);
		botmodel.fetch().done(function (result) {

			console.log(botmodel);

			if (botmodel.attributes.companyId != 0) {
				var companyname = botmodel.attributes.company.name,
					companybalance = botmodel.attributes.company.currentbalance,
					companyprofit = botmodel.attributes.company.profit,
					companystart = botmodel.attributes.company.startingbalance,
					companyid = botmodel.attributes.company.id;
				companymodel = {id: companyid, name: companyname, startingbalance: companystart, currentbalance: companybalance, profit: companyprofit} 
				console.log('companymodel: ', companymodel);
				var companygrab = new Backbone.Model(companymodel);
				var companyview = new App.Views.CompanyAssocView({model: companygrab});	
			}

			if (botmodel.attributes.userId != 0) {	
				var username = botmodel.attributes.user.username,
					usercompany = botmodel.attributes.user.companyname,
					userbalance = botmodel.attributes.user.currentbalance,
					userprofit = botmodel.attributes.user.profit,
					userid = botmodel.attributes.user.id;
				usermodel = {id: userid, username: username, companyname: usercompany, currentbalance: userbalance, profit: userprofit}
				console.log('usermodel: ', usermodel);
				var usergrab = new Backbone.Model(usermodel);
				var userview = new App.Views.UserAssocView({model: usergrab});
			}

			if (botmodel.attributes.stock) {
				var stockname = botmodel.attributes.stock.name,
				    stockprice = botmodel.attributes.stock.price,
				    stockid = botmodel.attributes.stock.id;
				stockmodel = {id: stockid, name: stockname, price: stockprice}
				console.log('stockmodel', stockmodel);
				var stockgrab = new Backbone.Model(stockmodel);
				var stockview = new App.Views.StockAssocView({model: stockgrab});
			}

		});
	}

})