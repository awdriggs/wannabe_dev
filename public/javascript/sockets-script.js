console.log('sockets-script is loaded')

var tweetStream = []

  var socket = io();
  socket.on('tweet', function(tweet){
    var tweetDiv = $('<div>').addClass('tweet')
    tweetDiv.append('<img src="'+tweet.user.profile_image_url+'">')
    tweetDiv.append('<h2> @'+tweet.user.screen_name+'</h2>')

    tweetDiv.append('<p>'+tweet.text+'</p>')
    
    $('#tweets').prepend(tweetDiv);

    var count = $('#tweets').children().length;
    
    //only show ten tweets
    if(count > 3){
      $('#tweets div:last').fadeOut();
      $('#tweets div:last').remove();
    }
    
  });