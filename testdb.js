models = require('./models')



bot1 = { id: 1, 
	     balance: 1990 }

bot2 = { id: 2,
		 balance: 2010 }

 models.bots.findOne( user.id ).then(function (result) {
   result.update( user ).then(function (updatedResult) {
     res.send(updatedResult)
   });
 });



STOCKS has many BOTS
id, name, price

USERS has many BOTS

COMPANIES has many BOTS

TRADES has and belongs to many BOTS
id, 


BOTS belongs to STOCKS

BOTS belongs to USERS

BOTS belongs to COMPANIES

BOTS has and belongs to many TRADES



