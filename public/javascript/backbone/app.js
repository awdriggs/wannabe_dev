App = {
	Collections: {},
	Models: {},
	Views: {}
}

console.log('Backbone app.js loaded')

$(function () {


	App.testCollection = new App.Collections.TestCollection;

	App.testView = new App.Views.TestColView({ collection: App.testCollection })

	App.testCollection.fetch({ reset: true })

	// Single model:
	// App.testModel = new App.Models.TestModel

	// App.testView = new App.Views.TestView({model: App.testModel})

	// App.testModel.fetch();

});