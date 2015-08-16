console.log('ticker_update loaded')

//use this to display stocks on first load?
//build marquee on page load?

var updateMarquee = function(){
	
	//this data should be coming from the trade bot
	var priceobj = {
		aapl : 100,
		amzn : 200,
		fb : 300,
		goog : 400,
		msft : 500,
		twtr : 600 	
	}

	$.each(priceobj, function(key, value) {
        var symbolItem = $('.'+key)
        console.log(symbolItem.length)
        symbolItem.text(key.toUpperCase() + " : $" + value)
    });
}

//need to throw this in an io stream watcher....

// var socket = io();
// socket.on('marquee', function(priceobj) {
// 	//do all the updates here!
// })