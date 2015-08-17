console.log('test loaded')

$(function() {
    getSession();

    //delegate buttons for logout, append to the bottom of 

    $('#input_ui').on('click', '#logout_button', endSession);


})

var getSession = function() {
    $.ajax("/session", {
        type: "GET",
        dataType: "json",
        success: function(result) {
            console.log(result)

            if (result.name == null || result.name == undefined) {
                $('#input_ui').empty();
                //show the user input template
                App.loginView = new App.Views.LoginView();

                return false;
            } else {
                console.log('we have a user')
                $('#input_ui').empty();
                App.currentUserView = new App.Views.CurrentUserView();
                //show the user info template

                //this is to set up the bot form, maybe it should live somewher else?

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

                $('#setbot').click(function() {
                    var bot_params = {
                        botname: $("input[name='botname']").val(),
                        balance: parseInt($("input[name='balance']").val()),
                        character: $("select[name='character']").val(),
                        interest: $("select[name='interest']").val(),
                        risk: parseInt($("#risk").text()),
                        stepsize: parseInt($("#trend").text()),
                        attitude: parseInt($("#attitude").text())
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
                        attitude: bot_params.attitude
                    });

                    App.bot.save();
                    console.log('bot SHOULD have saved');
                    socket.emit('change_bot', bot_params); //need to write script to handle is server
                });

            


                //add a button to the button of the sidebar for logout, kills the session
                //no user
                return true;
            }
        },
        error: function() {
            console.log(result)
        }
    });
}

var endSession = function() {
    console.log('end session now!')

    $.ajax("/removeuser", {
        type: "POST",
        dataType: "json",
        success: function(result) {
            console.log(result)
            $('#input_ui').empty();
            //show the user input template
            App.loginView = new App.Views.LoginView();
        },
        error: function() {
            console.log(result)
        }
    });
}