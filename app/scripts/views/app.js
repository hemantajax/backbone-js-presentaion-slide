define(['backbone', "views/slides", "collections/slides", "router"], function(Backbone, SlidesView, SlidesCollection, MainRouter ) {

	var AppView = Backbone.View.extend({
		el: "body",
		initialize: function(){
			var testCollection = [
				{title: "1st slide"},
				{title: "2nd slide"},
				{title: "3rd slide"},
			];
			new SlidesView({collection: new SlidesCollection(testCollection)});

			App.router = new MainRouter();
			Backbone.history.start();
		}
	});

	return AppView;
});