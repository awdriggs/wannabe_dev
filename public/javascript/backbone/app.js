App = {
	Collections: {},
	Models: {},
	Views: {}
}

console.log('Backbone app.js loaded')

$(function () {

	App.testModel = new App.Models.TestModel

	App.testView = new App.Views.TestView({model: App.testModel})

	App.testModel.fetch();

});