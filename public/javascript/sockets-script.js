console.log('sockets-script is loaded')

var tweetStream = []

var socket = io();

socket.on('tweet', function(tweet) {
    var tweetDiv = $('<div>').addClass('content')
    tweetDiv.append('<img src="' + tweet.user.profile_image_url + '">')
    tweetDiv.append('<h2> @' + tweet.user.screen_name + '</h2>')

    tweetDiv.append('<p>' + tweet.text + '</p>')

    $('#tweets').prepend(tweetDiv);

    var count = $('#tweets').children().length;

    //only show ten tweets
    if (count > 10) {
        $('#tweets div:last').fadeOut();
        $('#tweets div:last').remove();
    }
});

socket.on('trade', function(msg) {
    console.log('trade from node' + msg)
});

socket.on('price_update', function(price) {
    console.log('price update ' + price)
    updateMarquee(price);
});

var updateMarquee = function(priceobj){

    $.each(priceobj, function(key, value) {
        var keyfixed = key.substr(1); //$ can't be in the class name if you want jquery to work
        var symbolItem = $('.'+keyfixed)
        console.log(symbolItem);
        // console.log(symbolItem.length)
      
        var numericValue = parseFloat(value).toFixed(2)
        symbolItem.text(key.toUpperCase() + " : $" + numericValue)
        
    });
}

socket.on('trade', function(tradeObj) {
    var tradeDiv = $('<div>').addClass('content')
    //console.log('trade hit ' + tradeObj.trade_string )
    tradeDiv.append('<h2> @' + tradeObj.time + '</h2>')
    tradeDiv.append('<p>' + tradeObj.trade_string + '</p>')
    tradeDiv.append('<p> Stock:'+ tradeObj.stock_name + ' Spread: ' + tradeObj.spread +  ' New Price: ' + tradeObj.stock_price + '</p>')
    

    $('#trades').prepend(tradeDiv);

    var count = $('#trades').children().length;

    //only show ten tweets
    if (count > 10) {
        $('#trades div:last').fadeOut();
        $('#trades div:last').remove();
    }
});


