// The Model constructor
var CategoryModel = Backbone.Model.extend({
	
	defaults: function() {
		return {
			"category" : "default category",
			"type" : "default type",
		};
	},
	
	initialize: function(attributes, options){
		this.set({
			"category": attributes["category"] ? attributes["category"] : this.defaults().category,
			"type": attributes["type"] ? attributes["type"] : this.defaults().type
		});
	},
	
});


