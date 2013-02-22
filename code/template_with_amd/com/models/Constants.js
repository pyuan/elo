define([
		
		"jquery", 
		"backbone"
		
	], function($, Backbone) {

	var Constants = Backbone.Model.extend({
	
	},
	
	{
		
		FOLDER_TEMPLATES : "assets/templates/",
		EXTENSION_TEMPLATES : ".handlebars",
		
		/**** view classes need to be added here so they can be loaded before being initialized ****/
		VIEW_CLASSES : [
			"com/views/CategoriesPageView",
			"com/views/CategoryPageView",  
		],
			
	});

	return Constants;

}); 