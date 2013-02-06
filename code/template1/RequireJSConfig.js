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
		"handlebars" : "../libs/handlebars/handlebars",
		"deserialize" : "libs/jquery.deserialize/jquery.deserialize", //path is different because it's used on the index page 

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

	} 

});

// Includes File Dependencies
require([
	
		"jquery", 
		"jqm",
		"backbone", 
		"deserialize",
	
	], function($, JQM, Backbone, Deserialize) {
	
	/**
	 * when the page loads, load the class associate with the page
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
				require([pageClassName], function(PageClass){
					this.currentPage = new PageClass( {el: page, data: d} );
					
					/**
					 * manually trigger pagebeforeshow event to account for timing issue with
					 * AMD retrieving scripts asynchronously 
					 */ 
					$(page).trigger("pagebeforeshow");  
				});
			}
		}
	}); 
	
	/**
	 * redirect to landing page which is located in a subdir
	 */
	$(document).on("pageshow", function(event, data){
		if(event.currentTarget.URL.indexOf(".html") == -1)
		{
			$.mobile.changePage("pages/categories.html", {transition: "pop"});
		}
	}).trigger("pageshow");
	
}); 

