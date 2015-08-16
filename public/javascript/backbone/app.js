App = {
	Collections: {},
	Models: {},
	Views: {}
}

$(function () {

	$('#showstocks').click(function () {
		console.log('stocks')
		App.stocks = new App.Collections.Stocks;
		App.stocksView = new App.Views.StocksView({ collection: App.stocks })
		App.stocks.fetch({ reset: true });
	});


	$('#showusers').click(function () {
		console.log('users')
		App.users = new App.Collections.Users;
		App.usersView = new App.Views.UsersView({ collection: App.users })
		App.users.fetch({ reset: true });
	})

	$('#showcompanies').click(function () {
		console.log('companies')
		App.companies = new App.Collections.Companies;
		App.companiesView = new App.Views.CompaniesView({ collection: App.companies })
		App.companies.fetch({ reset: true });
	})

	$('#showbots').click(function () {
		console.log('bots')
		App.bots = new App.Collections.Bots;
		App.botsView = new App.Views.BotsView({ collection: App.bots })
		App.bots.fetch({ reset: true });
	});

})