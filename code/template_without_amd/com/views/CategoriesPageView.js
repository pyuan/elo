// Extends PagView class
var CategoriesPageView = PageView.extend({

    /**
     * The View Constructor
     * @param el, DOM element of the page
     */
    initialize: function() 
    {
		//this.collection.on( "added", this.render, this );
		this.render();
    },

    /**
     * Renders all of the Category models on the UI
     * called whenever the collection is changed for this view
     * @param none
     */
    render: function() 
    {
    	//add link handler to go to each sub category page
    	this.$el.find("a.category").on("click", function(){
			var category = $(this).attr("id");
			var data = {category: category};
			$.mobile.changePage("category.html", {transition: "slide", data: data});
		});
		
        return this; //Maintains chainability
    }

});

