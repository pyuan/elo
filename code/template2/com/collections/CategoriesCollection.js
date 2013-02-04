var Collection = Backbone.Collection.extend( {

    // The Collection constructor
    initialize: function( models, options ) {

        // Sets the type instance property (ie. animals)
        this.type = options.type;

    },

    // Sets the Collection model property to be a Category Model
    model: Model,

    // Sample JSON data that in a real app will most likely come from a REST web service
    jsonArray: [

        { "category": "animals", "type": "Pets" },

        { "category": "animals", "type": "Farm Animals" },

        { "category": "animals", "type": "Wild Animals" },

        { "category": "colors", "type": "Blue" },

        { "category": "colors", "type": "Green" },

        { "category": "colors", "type": "Orange" },

        { "category": "colors", "type": "Purple" },

        { "category": "colors", "type": "Red" },

        { "category": "colors", "type": "Yellow" },

        { "category": "colors", "type": "Violet" },

        { "category": "vehicles", "type": "Cars" },

        { "category": "vehicles", "type": "Planes" },

        { "category": "vehicles", "type": "Construction" }

    ],

    // Overriding the Backbone.sync method (the Backbone.fetch method calls the sync method when trying to fetch data)
    sync: function( method, model, options ) {

        // Local Variables
        // ===============

        // Instantiates an empty array
        var categories = [],

        // Stores the this context in the self variable
        self = this,

        // Creates a jQuery Deferred Object
        deferred = $.Deferred();

        // Filters the above sample JSON data to return an array of only the correct category type
        categories = _.filter( self.jsonArray, function( row ) {
            return row.category === self.type;
        });

        // Calls the options.success method and passes an array of objects (Internally saves these objects as models to the current collection)
        //options.success( categories );
        self.reset(categories);

        // Triggers the custom `added` method (which the Category View listens for)
        self.trigger( "added" );

        // Resolves the deferred object (this triggers the changePage method inside of the Category Router)
        deferred.resolve();

        // Returns the deferred object
        return deferred;

    }

});


