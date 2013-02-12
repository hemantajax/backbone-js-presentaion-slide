define(['backbone', "views/slide"], function(Backbone, SlideView, MainRouter) {

	var SlidesView = Backbone.View.extend({
		el: $(".slides"),
		initialize: function(){
			this.currentSlideIndex = 1;
			this.transitionSpeed = 1000;
			this.numSlides = this.collection.length;

			this.renderAll();
			App.Vent.on("init", this.hideAllButFirst, this);
			App.Vent.on("changeSlide", this.changeSlide, this);
		},

		changeSlide: function(opts){
			var newSlide,
				slides = this.$el.children(),
				self= this;

			//this.hideAllButFirst();

			if(opts.slideIndex){
				this.currentSlideIndex = ~~opts.slideIndex;
			}else{
				this.setCurrentSlideIndex(opts.direction);
			}
			newSlide = slides.eq(this.currentSlideIndex - 1);
			
			slides.filter(":visible").css("position","absolute")
				  .animate({
				  	top: opts.direction === "next" ? "100%" : "-100%",
				  	opacity: "hide"
				  }, this.transitionSpeed, function(){

				  	$(this).css("top", 0);

				  	newSlide.css("position","absolute")
				  			.css("top", opts.direction === "next" ? "-100%" : "100%")
				  			.animate({
							  	top: 0,
							  	opacity: "show"
							  }, self.transitionSpeed);
				  });

				  App.router.navigate("/slides/" + this.currentSlideIndex);

		}, 

		setCurrentSlideIndex: function(direction){
			this.currentSlideIndex += direction === "next" ? 1 : -1;

			if(this.currentSlideIndex > this.numSlides){
				this.currentSlideIndex  = 1;
			}

			if(this.currentSlideIndex <= 0){
				this.currentSlideIndex = this.numSlides;
			}

			console.log(this.currentSlideIndex);
		},

		hideAllButFirst: function(){
			this.$el.children(":nth-child(n+2)").hide();
		},

		renderAll: function(){
			this.$el.empty();
			this.collection.each(this.render, this);
		},

		render: function(slide){
			var slideView = new SlideView({model: slide});
			this.$el.append(slideView.render().el);
		}

	});

	return SlidesView;

});