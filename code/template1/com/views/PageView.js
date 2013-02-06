define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.View
    var PageView = Backbone.View.extend( {

        /**
         * The View Constructor
         * setup listeners for page events
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
			var self = this;
			this.$el.on("pagebeforehide", function(event, data){
				self._onPageBeforeHide(event, data);
				//console.log("pagebeforehide");
			}).on("pagehide", function(event, data){
				self._onPageHide(event, data);
				//console.log("pagehide");
			}).on("pagebeforeshow", function(event, data){
				self._onPageBeforeShow(event, data);
				//console.log("pagebeforeshow");
			}).on("pageshow", function(event, data){
				self._onPageShow(event, data);
				//console.log("pageshow");
			});
        },
        
        /**
         * handler before the page is shown
         * to be extended in child classes
         * render the view
         * @param event
         * @param data
         */
        _onPageBeforeShow: function(event, data) {
        	this.render();
        },
        
        /**
         * handler when the page is shown
         * to be extended in child classes
         * @param event
         * @param data
         */
        _onPageShow: function(event, data) {},
        
        /**
         * handler before the page is hidden
         * to be extended in child classes
         * @param event
         * @param data
         */
        _onPageBeforeHide: function(event, data) {},
        
        /**
         * handler when the page is hidden
         * to be extended in child classes
         * @param event
         * @param data
         */
        _onPageHide: function(event, data) {},

        /**
         * Renders all of the Category models on the UI
         * called whenever the collection is changed for this view
         * @param none
         */
        render: function() {
            return this; //Maintains chainability
        },

    } );

    // Returns the View class
    return PageView;

} );