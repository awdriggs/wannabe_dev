App.Models.Stock = Backbone.Model.extend({

	urlRoot: '/api/stocks',
	tagName: 'div',
	query: null,

	initialize: function () {
		console.log('stock model created');
		clearInterval(this.query);
		// this.sync();
	},

	sync: function () { 
		self = this
		this.query = setInterval(function() {
		    console.log("sync stock model");	
		    self.fetch();
		}, 10000);
	}

})