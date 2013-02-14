define(['backbone'], function(Backbone) {
	var Router = Backbone.Router.extend({
		routes: {

			"": "home",
			"slides/:id": "showSlide"
		},

		home: function(){
			App.Vent.trigger("init");
		},

		showSlide: function(slideIndex){
			App.Vent.trigger("changeSlide",{
				slideIndex: slideIndex
			});
		}
		
	});

	return Router;

});