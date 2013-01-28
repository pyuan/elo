// Sets the require.js configuration for your application.
require.config({

	// 3rd party script alias names 
	paths : {
		
		"jquery" : "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min",
		"jquerymobile" : "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min",
		"underscore" : "http://underscorejs.org/underscore-min",
		"backbone" : "http://backbonejs.org/backbone-min",
		"handlebars" : "../../libs/handlebars/handlebars",
		"hbs" : "../../libs/handlebars/hbs",
		"com" : "../",
		"templates" : "../../assets/templates",

	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim : {

		"backbone" : {
			"deps" : ["underscore", "jquery"],
			"exports" : "Backbone" //attaches "Backbone" to the window object
		}

	} // end Shim Configuration

});

// Includes File Dependencies
require([
	
		"jquery", 
		"backbone", 
		"com/routers/MobileRouter" 
	
	], function($, Backbone, Mobile) {

	$(document).on("mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			$.mobile.linkBindingEnabled = false;
	
			// Disabling this will prevent jQuery Mobile from handling hash changes
			$.mobile.hashListeningEnabled = false;
	})
	
	require([
		
			"jquerymobile"
			
		], function() {
			
		// Instantiates a new Backbone.js Mobile Router
		this.router = new Mobile();
		
	});
}); 

