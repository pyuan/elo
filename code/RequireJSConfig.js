// Sets the require.js configuration for your application.
require.config({

	// 3rd party script alias names 
	paths : {
		
		"com" : "../com",
		"templateutils" : "../com/utils/TemplateUtils",
		
		"jquery" : "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min",
		"jqm" : "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min",
		"underscore" : "http://underscorejs.org/underscore-min",
		"backbone" : "http://backbonejs.org/backbone-min",
		//TODO: needs to be fixed, because it's used on index page so dir is diff
		"handlebars" : "../libs/handlebars/handlebars",  
		"deserialize" : "libs/jquery.deserialize/jquery.deserialize",

	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim : {
		
		"jqm" : {
			"deps" : ["jquery"],
			"exports" : "JQM"
		},
		"backbone" : {
			"deps" : ["underscore", "jquery"],
			"exports" : "Backbone" //attaches "Backbone" to the window object
		},
		"handlebars" : {
			"deps" : ["jquery"],
			"exports" : "Handlebars"
		},
		"deserialize" : ["jquery"],

	} // end Shim Configuration

});

// Includes File Dependencies
require([
	
		"jquery", 
		"jqm",
		"backbone", 
		"deserialize",
		//"com/routers/MobileRouter", 
	
	], function($, JQM, Backbone, Deserialize/*, Mobile*/) {
	
	$(document).on("mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			//$.mobile.linkBindingEnabled = false;
	
			// Disabling this will prevent jQuery Mobile from handling hash changes
			//$.mobile.hashListeningEnabled = false;
			
			console.log("Mobile init");
			
	}).trigger("mobileinit");
	
	/*
	//for subpages layout
	require([
			"jquerymobile",
		], function() {
		// Instantiates a new Backbone.js Mobile Router
		this.router = new Mobile();
	});
	*/
	
	/**
	 * when the page loads, load the class associate with the page
	 */
	$(document).on("pageload", function(event, data){
		var page = $("div[data-role=page]").last();
		if(page)
		{
			var pageClass = $(page).attr("data-class");
		
			//process params from url and pass to new page
			var d;
			if(data && data.dataUrl.indexOf("?") != -1) {
				var start = data.dataUrl.indexOf("?") + 1;
				d = $.deserialize(data.dataUrl.substring(start));
			}
			
			/*
			if(event.currentTarget.baseURI.indexOf("?") != -1) {
				var start = event.currentTarget.baseURI.indexOf("?") + 1;
				d = $.deserialize(event.currentTarget.baseURI.substring(start));
			}
			*/
			
			if(pageClass)
			{
				require([pageClass], function(PageClass){
					this.currentPage = new PageClass( {el: page, data: d} );
				});
			}
		}
	}).trigger("pageload"); //trigger for the initial page
	
	/**
	 * redirect to landing page which is located in a subdir
	 */
	$(document).on("pageshow", function(event, data){
		if(event.currentTarget.URL.indexOf(".html") == -1){
			//go to landing page
			$.mobile.changePage("pages/categories.html", {transition: "pop"});
		}
	}).trigger("pageshow");
	
}); 

