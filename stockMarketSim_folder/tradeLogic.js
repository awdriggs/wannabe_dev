var tradeLogic = function (botChar, self, marketPriceInput, newTrendVal) {
    console.log('tradeLogic loaded...');
    //this.marketPrice = parseFloat(marketPriceInput);
	
    //setup behavior based on characteristics 
	switch (botChar) {
		
        // basic marketBuyer bot will always buy but at lowest urgency
        case 'marketBuyer':
            //console.log (marketPrice + ' is the current price ' + self.name + ' can see.')
            self.offerPrice = parseFloat(marketPriceInput);
            self.orderType = 'BUY';
            self.lookingForTrade = true;
            self.urgency = 0;
	        console.log(self.name + ' is a constant buyer, looking for trade: for $' + self.offerPrice + ',' + self.lookingForTrade + ', urgency: [' + self.urgency + ']');
        break;

	    // basic marketBuyer bot will always buy but at lowest urgency
	    case 'marketSeller':
            self.offerPrice = parseFloat(marketPriceInput);
            self.orderType = 'SELL';
            self.lookingForTrade = true;
            self.urgency = 0;
            console.log(self.name + ' is a constant seller, looking for trade: for $' +  self.offerPrice + ',' + self.lookingForTrade + ', urgency: [' + self.urgency + ']');
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
            if (absVal >= 0 && absVal < 3) {
                if (self.orderType == 'BUY') {
                    self.offerPrice = parseFloat(marketPriceInput) + 0.25;
                }else{
                    self.offerPrice = parseFloat(marketPriceInput) - 0.25;
                };
                self.urgency = 1;
                console.log("current market price is from market trader:" + parseFloat(marketPriceInput));
                console.log(self.name + " kind of want to " + self.orderType + self.stockinterest + " for $" + self.offerPrice + ', urgency: [' + self.urgency + ']');
            //desired to do something
            }else if (absVal >= 3 && absVal < 6) {
                if (self.orderType == 'BUY') {
                    self.offerPrice = parseFloat(marketPriceInput) + 1.50;
                }else{
                    self.offerPrice = parseFloat(marketPriceInput) - 1.50;
                };
                self.urgency = 5;
                console.log("current market price is from market trader:" + parseFloat(marketPriceInput));
                console.log(self.name + " really want to " + self.orderType + self.stockinterest + " for $" + self.offerPrice + ', urgency: [' + self.urgency + ']');
            //desperate to do something
            }else if (absVal > 6) {
                if (self.orderType == 'BUY') {
                    self.offerPrice = parseFloat(marketPriceInput) + 3;
                }else{
                    self.offerPrice = parseFloat(marketPriceInput) - 3;
                };
                self.urgency = 10;

                console.log("current market price is from market trader:" + parseFloat(marketPriceInput));
                console.log(self.name + " desperatelly want to " + self.orderType + self.stockinterest + " for $" + self.offerPrice + ', urgency: [' + self.urgency + ']');
            };
            self.lookingForTrade = true;
        break;
              
        // basic price trader bot will trade following price movements
        case 'priceTrader':
            //testing user inputed bots                        
            self.offerPrice = parseFloat(marketPriceInput) + 2;
            self.orderType = 'BUY';
            self.urgency = 10;
            self.lookingForTrade = true;
            console.log("current market price is a price trader");
        break;
        
        //find empty bots
	    default:
			console.log("Woah dis bot has no characteristics contact someone right away!");
        break;
	};
};

module.exports = tradeLogic;
