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


var tradeLogic = function (botChar, self) {
    
    console.log('tradeLogic loaded...');
	//setup behavior based on characteristics 
	switch (botChar) {
		
        // bot will always buy but at lowest urgency
	    case 'marketBuyer':
	        console.log(self.name + ' is a constant buyer. lowest possible urgency [-1]');

        break;

	    // bot will always buy but at lowest urgency
	    case 'marketSeller':
	        console.log(self.name + ' is a constant seller. lowest possible urgency [-1]');
	        
        break;
	    
        //find empty bots
	    default:
			console.log("Woah dis bot has no characteristics contact someone right away!");
        break;
	};
};


module.exports = tradeLogic;
