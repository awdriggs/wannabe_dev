//this file is being unlinked from index.html temporarily so that a user will see the new bot form immediately.
//we are making this change because we haven't flushed out the user sessions and user views.
//to activate sessions sign-on again, go to index to remove the commented out reference.
//also change the el in CurrentUserView

console.log('test loaded')

$(function() {
    getSession();

    //delegate buttons for logout, append to the bottom of 

    $('#input_ui').on('click', '#logout_button', endSession);
    $('#input_ui').on('click', '#login_button', login);
    $('#input_ui').on('click', '#signup_button', signup);
    $('#input_ui').on('click', '#new_bot', newBot);
    $('#input_ui').on('click', '.my_bot', lookAtBot);
    
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
                App.Session = result; //this makes the session info live globally!
                console.log('we have a user')
                $('#input_ui').empty();
                App.currentUserInfo = new App.Views.CurrentUserInfoView();

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

var login = function() {
    console.log('login clicked')

    var loginInfo = {
        name: $("input[name='name']").val(),
        password: $("input[name='password']").val()
    };

    console.log(loginInfo);

    //grab form data
    $.ajax("/login", {
        type: "POST",
        data: loginInfo,
        dataType: "json",
        success: function(result) {
            getSession();
        },
        error: function() {
            console.log(result)
        }
    });
}

var signup = function() {
    console.log('signup clicked')
    var signupInfo = {
        name: $("input[name='signup_name']").val(),
        password: $("input[name='signup_password']").val(),
        email: $("input[name='email']").val()
    };

    console.log(signupInfo);

    $.ajax("/setuser", {
        type: "POST",
        data: signupInfo,
        dataType: "json",
        success: function(result) {
            getSession();
        },
        error: function() {
            console.log(result)
        }
    });
}

var newBot = function() {
    $("#edit_area").empty();
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

    $('#setbot').click(function() {

        var bot_params = {
            botname: $("input[name='botname']").val(),
            balance: parseInt($("input[name='balance']").val()),
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
        clearNewBot();
    });
    
    $('#cancel').click(function() {
        clearNewBot();
    })
    //add a button to the button of the sidebar for logout, kills the session
    //no user
}

var clearNewBot = function(){
    console.log('cancel clicked')
    $('#input_ui').empty();
        App.currentUserInfo = new App.Views.CurrentUserInfoView();
}

var lookAtBot = function(){
    console.log('look at this bot');
}