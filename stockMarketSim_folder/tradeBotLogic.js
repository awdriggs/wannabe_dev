/*
	//bot trade logic
	var importanceVal = 0;
	//buyer trade importance
    if ( role=='Buy' && (newVal < 0) ) {
    	//neutral
    	offer = stockListing.market[0].GOOGL;
    	console.log(this.name + " kind of want to " + role + " for $" + offer);
    	importanceVal = 0;
    }else if ( role=='Buy' && (newVal >= 0 && newVal < 5) ) {
    	//desired buy
    	offer = stockListing.market[0].GOOGL + 1.25;
    	console.log(this.name + " really of want to " + role + " for $" + offer);
    	importanceVal = 1;
    }else if ( role=='Buy' && (newVal >= 5 && newVal <= 10)) {
    	//desperate buy
    	offer = stockListing.market[0].GOOGL + 2.5;
    	console.log(this.name + " desperatelly of want to " + role + " for $" + offer);
    	importanceVal = 2;
    };
    //seller trade importance
    if ( role=='Sell' && (newVal > 0) ) {
    	//neutral
    	offer = stockListing.market[0].GOOGL;
    	console.log(this.name + " kind of want to " + role + " for $" + offer);
    	importanceVal = 0;
    }else if ( role=='Sell' && (newVal <= 0 && newVal > -5) ) {
    	//desired buy
    	offer = stockListing.market[0].GOOGL - 1.25;
    	console.log(this.name + " really of want to " + role + " for $" + offer);
    	importanceVal = 1;
    }else if ( role=='Sell' && (newVal <= -5 && newVal >= -10)) {
    	//desperate buy
    	offer = stockListing.market[0].GOOGL - 2.5;
    	console.log(this.name + " desperatelly of want to " + role + " for $" + offer);
    	importanceVal = 2;
    };
*/
/*
	Bot charactistics:
		random: sometimes buy sometimes sell randomly
		pumper: always try to buy
		dumper: always try to sell
		
		scalper: buy low sell high often
		chaser: buy high sell higher often
		horder: buy and hold never sell
		
		trendbot: set bot to trade with trend
		metabot: watch what other bots do
*/

var traderCharacteristics = function (botChar, self) {
	//setup behavior based on characteristics 
	switch (botChar) {
		//pumper characteristics
	    case 'pumper':
	        console.log(self.name + ' is a constant buyer.');

	        break;
	    //dumper characteristics
	    case 'dumper':
	        console.log(self.name + ' is a constant seller.');
	        
	        break;
	    //edge case finder
	    default:
			console.log("Woah dis bot has no characteristics contact someone right away!");
			break;
	};
};



