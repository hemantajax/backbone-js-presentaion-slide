require.config({
  shim: {
  	backbone:{
  		deps:["../components/underscore/underscore", "jquery"],
  		exports: "Backbone"
  	}
  },

  paths: {
    jquery: 'vendor/jquery.min',
    backbone: "../components/backbone/backbone",
    prettify: "../components/google-code-prettify/src/prettify"
  }
});

require(['views/app', "prettify"], function(AppView) {
  window.App = {
    Vent: _.extend({}, Backbone.Events)
  };

	new AppView();
});

// require(['models/slide', 'viwes/slide'], function(SlideModel, SlideView) {

// 	var slideModel = new SlideModel({title: "my very 1st slide"});
// 	var slideView = new SlideView({model: slideModel});

// 	$("body").append(slideView.render().el);
// });