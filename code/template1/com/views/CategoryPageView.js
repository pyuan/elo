define([ 
		
		"jquery", 
		"backbone",
		"templateutils",
		"com/views/PageView",
		"com/collections/CategoriesCollection",
	
	], function( $, Backbone, TemplateUtils, PageView, CategoriesCollection ) {
		
    // Extends PagView class
    var CategoryPageView = PageView.extend({
    	
    	_category : "",

        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function() 
        {
        	this._category = this.options.data["category"];
        	this.collection = new CategoriesCollection( [] , { type: this._category } );
			this.collection.on( "added", this.render, this );
			this.collection.fetch(); //triggers render
			console.log("Category view initialized: " + this._category);
        },

        /**
         * Renders all of the Category models on the UI
         * called whenever the collection is changed for this view
         * create view based on template
         * @param none
         */
        render: function() 
        {
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
            
            //populate the header
            this.$el.find("#header").text(this._category);
            
            return this; //Maintains chainability
        }

    } );

    // Returns the View class
    return CategoryPageView;

} );