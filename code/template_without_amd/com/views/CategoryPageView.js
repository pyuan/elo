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
		
		//TODO: examples of adding page event listeners
		var self = this;
		this.$el.on("pagebeforeshow", function(){
			console.log(self._category + " pagebeforeshow");
		}).on("pageshow", function(){
			console.log(self._category + " pageshow");
		}).on("pagebeforehide", function(){
			console.log(self._category + " pagebeforehide");
		}).on("pagehide", function(){
			console.log(self._category + " pagehide");
		});
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

});
