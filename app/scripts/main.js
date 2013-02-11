require.config({
  shim: {
  	backbone:{
  		deps:["../components/underscore/underscore", "jquery"],
  		exports: "Backbone"
  	}
  },

  paths: {
    jquery: 'vendor/jquery.min',
    backbone: "../components/backbone/backbone"
  }
});

require(['models/slide', 'viwes/slide'], function(SlideModel, SlideView) {

	var slideModel = new SlideModel({title: "my very 1st slide"});
	var slideView = new SlideView({model: slideModel});

	$("body").append(slideView.render().el);
});