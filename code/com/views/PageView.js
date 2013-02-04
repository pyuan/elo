define([ 
		
		"jquery", 
		"backbone",
	
	], function( $, Backbone ) {
		
    // Extends Backbone.View
    var PageView = Backbone.View.extend( {

        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
			this.render();
        },

        /**
         * Renders all of the Category models on the UI
         * called whenever the collection is changed for this view
         * @param none
         */
        render: function() 
        {
            return this; //Maintains chainability
        }

    } );

    // Returns the View class
    return PageView;

} );