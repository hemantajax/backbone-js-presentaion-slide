define(['backbone'], function(Backbone) {

	var Slide = Backbone.View.extend({
		className: "slide",
		render: function(){

			if(this.model.get("image")){
				this.getImage();
			} else if(this.model.get("bullets")){
				this.getBullets();
			} else if(this.model.get("quote")){
				this.getQuote();
			} else if(this.model.get("snippet")){
				this.getSnippet();
			}  
			else {
				this.getHeading();
			}

			
			return this;
		},

		getHeading: function(){
			this.$el.append("<h1 class='" + this.model.get("size") +"'>" + this.model.get("title") + "</h1>");
		},

		getImage: function(){
			this.$el.addClass("image")
					.append('<img src="'+this.model.get("image") + '" />');
		},

		getBullets: function(){
			var list = "<li>" + this.model.get("bullets").join("</li><li>");
			
			if(this.model.get("title")){
				this.getHeading();
			}

			this.$el.addClass("bullets")
				.append(["<ul>",list, "</ul>"].join(""));			
		},

		getQuote: function(){
			this.$el.addClass("quote")
				.append(["<figure>",
							"<blockquote>",
								this.model.get("quote"),
							"</blockquote>",
							"<figcaption>",
								"<cite>",
									this.model.get("cite"),
								"</cite>",
							"</figcaption>",
						"</figure>"	].join(""));			
		},

		getSnippet: function(){

			var self = this,
				snippet = this.model.get("snippet");

			if(this.model.get("title")){
				this.getHeading();
			}

			

			$.ajax({
				url: snippet
			}).done(function(data){
				self.$el.addClass("snippet").append("<pre class='prettyprint' >" + _.escape(data) + "</pre>");
				prettyPrint();
			});
				//.append(["<ul>",list, "</ul>"].join(""));			
		}
	});

	return Slide;
});