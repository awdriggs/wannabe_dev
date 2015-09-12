App = {
    Collections: {},
    Models: {},
    Views: {}
}

$(function() {
    //set viz_wrapper to hide
    $('#viz_wrapper').hide();
    
    $('#nav').click(function() {
        $('#viz_wrapper').show();
    })

    $('#close').click(function() {
        $('#viz_wrapper').hide();
    })


    $('#showstocks').click(function() {
        $('#container').empty();
        // $('#stocks-container').empty();
        // $('#bots-container').empty();
        // $('#companies-container').empty();
        // $('#users-container').empty();
        App.stocks = new App.Collections.Stocks;
        App.stocksView = new App.Views.StocksView({
            collection: App.stocks
        })
        App.stocks.fetch({
            reset: true
        });
    });


    // $('#showusers').click(function() {
    //     $('#container').empty();
    //     // $('#bots-container').empty();
    //     // $('#stocks-container').empty();
    //     // $('#companies-container').empty();
    //     // $('#users-container').empty();
    //     App.users = new App.Collections.Users;
    //     App.usersView = new App.Views.UsersView({
    //         collection: App.users
    //     })
    //     App.users.fetch({
    //         reset: true
    //     });
    // })

    // $('#showcompanies').click(function() {
    //     $('#container').empty();
    //     // $('#companies-container').empty();
    //     // $('#stocks-container').empty();
    //     // $('#bots-container').empty();
    //     // $('#users-container').empty();
    //     App.companies = new App.Collections.Companies;
    //     App.companiesView = new App.Views.CompaniesView({
    //         collection: App.companies
    //     })
    //     App.companies.fetch({
    //         reset: true
    //     });
    // })

    $('#showbots').click(function() {
        $('#container').empty();
        // $('#bots-container').empty();
        // $('#stocks-container').empty();
        // $('#companies-container').empty();
        // $('#users-container').empty();
        App.bots = new App.Collections.Bots;
        App.botsView = new App.Views.BotsView({
            collection: App.bots
        })
        App.bots.fetch({
            reset: true
        });
    });

    //testing for sessions
    //what is the best place for these sliders?
    // $(function() {
    //     $(".risk-slider").slider({
    //         min: 0,
    //         max: 10,
    //         slide: function(event, ui) {
    //             $("#risk").text(ui.value);
    //         }
    //     });
    // });

    // $(function() {
    //     $(".trend-slider").slider({
    //         min: 0,
    //         max: 10,
    //         slide: function(event, ui) {
    //             $("#trend").text(ui.value);
    //         }
    //     });
    // });

    // $(function() {
    //     $(".attitude-slider").slider({
    //         min: 0,
    //         max: 10,
    //         slide: function(event, ui) {
    //             $("#attitude").text(ui.value);
    //         }
    //     });
    // });

    // $('#setbot').click(function() {
    //     var bot_params = {
    //         botname: $("input[name='botname']").val(),
    //         balance: parseInt($("input[name='balance']").val()),
    //         character: $("select[name='character']").val(),
    //         interest: $("select[name='interest']").val(),
    //         risk: parseInt($("#risk").text()),
    //         stepsize: parseInt($("#trend").text()),
    //         attitude: parseInt($("#attitude").text())
    //     }
    //     console.log(bot_params)

    //     // Instantiate new bot model
    //     App.bot = new App.Models.Bot;
    //     // Set all default attributes for simulator
    //     App.bot.set({
    //         quantity: 0,
    //         active: 'True',
    //         userId: 1,
    //         stockId: 1,
    //         company: 0
    //     });
    //     // Set all user-defined attributes
    //     App.bot.set({
    //         botname: bot_params.botname,
    //         balance: bot_params.balance,
    //         character: bot_params.character,
    //         stockinterest: bot_params.interest,
    //         risktolerance: bot_params.risk,
    //         stepsize: bot_params.stepsize,
    //         attitude: bot_params.attitude
    //     });

    //     App.bot.save();
    //     console.log('bot SHOULD have saved');

    // });
    
    // //emitter for the set/update of the bot
    // $('#setbot').click(function() {
    //     console.log('spitter');
    //     socket.emit('change_bot', "working?" ); //need to write script to handle is server
         
    // });
})