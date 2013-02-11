define(['backbone', "views/slides", "collections/slides"], function(Backbone, SlidesView, SlidesCollection ) {

	var AppView = Backbone.View.extend({
		el: "body",
		initialize: function(){
			var testCollection = [
				{title: "1st slide"},
				{title: "2nd slide"},
				{title: "3rd slide"},
			];
			new SlidesView({collection: new SlidesCollection(testCollection)});
		}
	});

	return AppView;
});