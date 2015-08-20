console.log('tempuserui.js working')


$(function() {
    

    //delegate buttons for logout, append to the bottom of 

    newBot();
    
    
})


var newBot = function() {

	$('#update').hide();

    $("#input_ui").empty();
    App.currentUserView = new App.Views.CurrentUserView();
    //show the user info template


    $(".risk-slider").slider({
        min: 0,
        max: 10,
        slide: function(event, ui) {
            $("#risk").text(ui.value);
        }
    });


    $(".trend-slider").slider({
        min: 0,
        max: 10,
        slide: function(event, ui) {
            $("#trend").text(ui.value);
        }
    });

    $(".attitude-slider").slider({
        min: 0,
        max: 10,
        slide: function(event, ui) {
            $("#attitude").text(ui.value);
        }
    });

    //hiding the balance because it isn't being used...
    $("input[name='balance']").hide();
   	$("label[for='balance']").hide()

    $('#setbot').click(function() {

        var bot_params = {
            botname: $("input[name='botname']").val(),
            balance: 5000, //parseInt($("input[name='balance']").val()),
            character: 'priceTrader',
            interest: $("select[name='interest']").val(),
            risk: parseInt($("#risk").text()),
            stepsize: parseInt($("#trend").text()),
            attitude: parseInt($("#attitude").text()),
            companyId: 0,
            stockId: $("option:selected").attr('data-id')
        }
        console.log(bot_params)

        // Instantiate new bot model
        App.bot = new App.Models.Bot;
        // Set all default attributes for simulator
        App.bot.set({
            quantity: 0,
            active: 'True',
            userId: 1,
            stockId: 1,
            company: 0
        });
        // Set all user-defined attributes
        App.bot.set({
            botname: bot_params.botname,
            balance: bot_params.balance,
            character: bot_params.character,
            stockinterest: bot_params.interest,
            risktolerance: bot_params.risk,
            stepsize: bot_params.stepsize,
            attitude: bot_params.attitude,
            companyId: 0,
            stockId: $("option:selected").attr('data-id')
        });

        App.bot.save();
        console.log('bot SHOULD have saved');
        socket.emit('change_bot', bot_params); //need to write script to handle is server

        //reset the view
        $("#input_ui").empty();
        $('#update').show();
        var message = $("<p>"+ bot_params.botname + " is now trading " + bot_params.interest + "</p><br><p>Checkout 'Show Bots' to see how " + bot_params.botname + " does! </p>")
        $("#update").append(message);
        
        window.setTimeout(function(){
        	newBot();
        	$('#update').hide();
        	$('#update').empty();
        }, 3000);
        
    });
    
    $('#cancel').click(function() {
        newBot();
    })
    //add a button to the button of the sidebar for logout, kills the session
    //no user
}


