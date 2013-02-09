// Sets the require.js configuration for your application.
require.config({

	// 3rd party script alias names 
	paths : {
		
		"jquery" : "libs/jquery/jquery.1.8.2.min",
		"jqm" : "libs/jquery.mobile/jquery.mobile-1.2.0.min",
		"deserialize" : "libs/jquery.deserialize/jquery.deserialize",  
		"underscore" : "libs/underscore/underscore-min",
		"backbone" : "libs/backbone/backbone-min",
		"handlebars" : "libs/handlebars/handlebars",
		"com" : "com",
		"templateutils" : "com/utils/TemplateUtils",

	},

	// Sets the configuration for your third party scripts that are not AMD compatible
	shim : {
		
		"backbone" : {
			"deps" : ["underscore", "jquery"],
			"exports" : "Backbone" //attaches "Backbone" to the window object
		},
		"handlebars" : {
			"deps" : ["jquery"],
			"exports" : "Handlebars"
		},
		"jqm" : ["jquery"],
		"deserialize" : ["jquery"],

	} 

});

// Includes File Dependencies
require([
	
		"jquery", 
		"jqm",
		"backbone",
		"deserialize",
		"com/models/Constants",
	
	], function($, JQM, Backbone, Deserialize, Constants) {
	
	
	require( Constants.VIEW_CLASSES, function(){
		
		var viewClasses = {};
		for(var i=0; i<Constants.VIEW_CLASSES.length; i++)
		{
			var className = Constants.VIEW_CLASSES[i];
			viewClasses[className] = arguments[i];
		}
		
		/**
		 * when the page loads, load the class associate with the page
		 * and trigger for to initialize the landing page
		 */
		$(document).on("pagebeforecreate", function(event, data){
			var page = $("div[data-role=page]").last();
			if(page)
			{
				var pageClassName = $(page).attr("data-class");
			
				//process params from url and pass to new page
				var d;
				var url = event.target.baseURI; //data && data.dataUrl
				if(url.indexOf("?") != -1) {
					var start = url.indexOf("?") + 1;
					d = $.deserialize(url.substring(start));
				}
				
				if(pageClassName)
				{
					console.log("Initializing " + pageClassName);
					var PageClass = viewClasses[pageClassName];
					this.currentPage = new PageClass( {el: page, data: d} );
				}
			}
		}).trigger("pagebeforecreate"); 
		
	});
	
}); 

