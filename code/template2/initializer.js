/**
 * load the scripts dynamically
 */
$.ajaxSetup({async: false});

//libs
$.getScript("libs/modernizr/modernizr.custom.89143.js");
$.getScript("http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js");
$.getScript("libs/underscore/underscore-min.js");
$.getScript("libs/backbone/backbone-min.js");
$.getScript("libs/handlebars/handlebars.js");
$.getScript("libs/jquery.deserialize/jquery.deserialize.js");

//models come before other classes because model definitions are required in collections
$.getScript("com/models/CategoryModel.js");
$.getScript("com/models/Constants.js");

//com
$.getScript("com/collections/CategoriesCollection.js");
$.getScript("com/controllers/ApplicationController.js");
$.getScript("com/utils/TemplateUtils.js");
$.getScript("com/views/PageView.js");
$.getScript("com/views/CategoriesPageView.js");
$.getScript("com/views/CategoryPageView.js");

$.ajaxSetup({async: true}); 

$(document).on("mobileinit", function(){
	ApplicationController.getInstance().init();
});



