models = require('./models')

// UPDATE BOT //

var new_balance = 1000
var botparams = { id: 1, balance: new_balance }

var updateBot = function (bot_params) {
	 models.bots.findOne( bot_params.id ).then(function (result) {
	   result.update( bot_params ).then(function (updatedResult) {
	     res.send(updatedResult)
	   });
	 });
};


// ADD BOT TO COMPANY

var addBot = function (company_bot_params) {
	create
}



// UPDATE STOCK //

var new_price = 40
var stock_params { id: 1, price: new_price }

var updateStock = function (stock_params) {
	models.stocks.findOne( stock_params.id ).then(function (result) {
		result.update( stock_params ).then(function (updatedResult) {
			res.send(updatedResult);
		});
	});
};


// GET BOT AND ITS STOCK

var getBotWithStock = function ( stock_bot_params ) {
	find
}


// GET ALL BOTS WITH STOCKS

var getAllBotsWithStocks = function ( stocks_bots_params) {
	findAll
}


// GET COMPANY WITH BOTS AND STOCKS

var getCompanyWithBotsAndStocks = function(company_bot_stocks_params) {
	find
}


// GET USER WITH BOTS AND STOCKS

var getWithBotsAndStocks = function (user_bot_stocks) {
	find

}


// UPDATE COMPANY

var updateCompany = function (company_params) {
	models.companies.findOne( company_params.id ).then(function (result) {
		result.update( company_params ).then(function (updatedResult) {
			res.send(updatedResult);
		});
	};
};



// STOCKS has many BOTS
// id, stockname, price

// USERS has many BOTS
// id, username, password, companyname, startingbalance, currentbalance, profit

// COMPANIES has many BOTS
// id, companyname, startingbalance, currentbalance, profit


// BOTS belongs to STOCKS
// BOTS belongs to USERS
// BOTS belongs to COMPANIES
// id, botname, balance, character, stockinterest, risktolerance, stepsize, attitude
// FK: stocksId, usersId, companiesId

