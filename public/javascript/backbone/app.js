App = {
	Collections: {},
	Models: {},
	Views: {}
}

console.log('Backbone app.js loaded')

$(function () {


	App.usersCollection = new App.Collections.UsersCollection;

	App.testView = new App.Views.TestColView({ collection: App.usersCollection })

	App.usersCollection.fetch({ reset: true })

	// Single model:
	// App.testModel = new App.Models.TestModel

	// App.testView = new App.Views.TestView({model: App.testModel})

	// App.testModel.fetch();

});