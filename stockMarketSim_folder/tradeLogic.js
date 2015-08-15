var tradeLogic = function (botChar, self, marketPrice, oldTrendVal, newTrendVal) {
    
    console.log('tradeLogic loaded...');
	//setup behavior based on characteristics 
	switch (botChar) {
		
        // basic marketBuyer bot will always buy but at lowest urgency
        case 'marketBuyer':
            //console.log (marketPrice + ' is the current price ' + self.name + ' can see.')
            self.offerPrice = marketPrice;
            self.orderType = 'BUY';
            self.lookingForTrade = true;
            self.urgency = -1;
	        console.log(self.name + ' is a constant buyer, looking for trade: for $' + self.offerPrice + ',' + self.lookingForTrade + ', urgency: [' + self.urgency + ']');
        break;

	    // basic marketBuyer bot will always buy but at lowest urgency
	    case 'marketSeller':
            self.offerPrice = marketPrice;
            self.orderType = 'SELL';
            self.lookingForTrade = true;
            self.urgency = -1;
            console.log(self.name + ' is a constant buyer, looking for trade: for $' + ',' +  self.offerPrice + self.lookingForTrade + ', urgency: [' + self.urgency + ']');
        break;

        // basic marketTrader bot will buy or sell using basic logic
        case 'marketTrader':
            //bot determining to buy or sell
            if ( newTrendVal >= 0 ) { 
                self.orderType = 'BUY';
            }else if ( newTrendVal < 0 ) {
                self.orderType = 'SELL';
            };
            var absVal = Math.abs(newTrendVal);
            //interested to do something
            if (absVal >= 0 && absVal <= 3) {
                if (self.orderType == 'BUY') {
                    self.offerPrice = marketPrice + 0.25;
                }else{
                    self.offerPrice = marketPrice - 0.25;
                };
                self.urgency = 1;
                console.log(self.name + " kind of want to " + self.orderType + ' $' + self.interests + " for $" + self.offerPrice + ', urgency: [' + self.urgency + ']');
            //desired to do something
            }else if (absVal > 3 && absVal < 6) {
                if (self.orderType == 'BUY') {
                    self.offerPrice = marketPrice + 1.50;
                }else{
                    self.offerPrice = marketPrice - 1.50;
                };
                self.urgency = 5;
                console.log(self.name + " really want to " + self.orderType + ' $' + self.interests + " for $" + self.offerPrice + ', urgency: [' + self.urgency + ']');
            //desperate to do something
            }else if (absVal > 6) {
                if (self.orderType == 'BUY') {
                    self.offerPrice = marketPrice + 3;
                }else{
                    self.offerPrice = marketPrice - 3;
                };
                self.urgency = 10;
                console.log(self.name + " desperatelly want to " + self.orderType + ' $' + self.interests + " for $" + self.offerPrice + ', urgency: [' + self.urgency + ']');
            };
            self.lookingForTrade = true;
        break;
        
        // basic price trader bot will trade following price movements
        case 'priceTrader':
            /*            
            if (marketPrice) {};
            self.orderType = 'BUY';
            self.lookingForTrade = true;
            console.log(self.name + ' is a constant buyer, looking for trade:' + self.lookingForTrade + ', urgency: [' + self.urgency + ']');
            */
            console.log(self.name + " is a priceTrader bot.")
            self.offerPrice = marketPrice;
            self.lookingForTrade = false;
            self.urgency = -1;
        break;
	    
        //find empty bots
	    default:
			console.log("Woah dis bot has no characteristics contact someone right away!");
        break;
	};
};


module.exports = tradeLogic;
