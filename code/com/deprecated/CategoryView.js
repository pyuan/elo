// Category View
// =============

// Includes file dependencies
define([ 
		
		"jquery", 
		"backbone",
		"templateutils",
		"com/models/Model", 
	
	], function( $, Backbone, TemplateUtils, Model ) {
		
    // Extends Backbone.View
    var CategoryView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            this.collection.on( "added", this.render, this );

        },

        // Renders all of the Category models on the UI
        render: function() {
            
            var self = this;
            var categories = [];
            for(var i in this.collection.models) {
            	var model = this.collection.models[i];
            	categories.push( {type: model.get("type")} );
            }
            var params = { categories: categories };
            TemplateUtils.getTemplate("list_item", params, function(html){
            	self.$el.find("ul").html(html).listview("refresh");
            });

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return CategoryView;

} );