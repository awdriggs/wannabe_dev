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

socket.on('price_update', function(price) {
    console.log('price update ' + price)
    updateMarquee(price);
});

var updateMarquee = function(priceobj){
    
    //this data should be coming from the trade bot
    // var priceobj = {
    //  aapl : 100,
    //  amzn : 200,
    //  fb : 300,
    //  goog : 400,
    //  msft : 500,
    //  twtr : 600  
    // }

    $.each(priceobj, function(key, value) {
        var keyfixed = key.substr(1); //$ can't be in the class name if you want jquery to work
        var symbolItem = $('.'+keyfixed)
        console.log(symbolItem);
        // console.log(symbolItem.length)
        symbolItem.text(key.toUpperCase() + " : $" + value)
    });
}


