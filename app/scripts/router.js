define(['backbone'], function(Backbone) {
	var Router = Backbone.Router.extend({
		routes: {

			"": "home",
			"slides/:id": "showSlide"
		},

		home: function(){
			console.log("Home Page");
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