/**
 * Class constructor for the application controller
 * singleton pattern
 * @param none
 */
function ApplicationController() {
	if (ApplicationController.SINGLETON) {
		throw "This class is a singleton, call getInstance() to retrieve the singleton instance.";
	}
}

//singleton instance
ApplicationController.SINGLETON = new ApplicationController();

/**
 * when object is printed out in the console
 */
ApplicationController.prototype.toString = function() {
	return "[singleton ApplicationController]";
}
/**
 * static function to retrieve the singleton instance
 * @param none
 */
ApplicationController.getInstance = function() {
	return ApplicationController.SINGLETON;
} 	

/**
 * initialize the application
 * @param none
 */
ApplicationController.prototype.init = function() 
{
	$(document).on("pageshow", this._onPageShow);
	$(document).on("pageload", this._onPageLoad);
	console.log("Application initialized.");
}

/**
 * called on every pageshow event
 * @param event
 * @param data
 */
ApplicationController.prototype._onPageShow = function(event, data)
{
	if(event.currentTarget.URL.indexOf(".html") == -1){
		//go to landing page
		$.mobile.changePage("pages/categories.html", {transition: "pop"});
	}
}

/**
 * call on every pagebeforeload event
 * dynamically initialize view class associated with the page being loaded
 * @param event
 * @paramd data
 */
ApplicationController.prototype._onPageLoad = function(event, data)
{
	var page = $("div[data-role=page]").last();
	if(page)
	{
		var pageClassName = $(page).attr("data-class");
	
		//process params from url and pass to new page
		var d;
		if(data && data.dataUrl.indexOf("?") != -1) {
			var start = data.dataUrl.indexOf("?") + 1;
			d = $.deserialize(data.dataUrl.substring(start));
		}
		
		if(pageClassName) {
			var PageClass = window[pageClassName];
			this.currentPage = new PageClass( {el: page, data: d} );
		}
	}
}

