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

		getHeading: function(heading){
			var title = this.model.get("title");

			if(heading){
				title = heading;
			}

			this.$el.append("<h1 class='" + this.model.get("size") +"'>" + title + "</h1>");
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

		setSnippet: function(snippetPath, heading){
			var self = this;

			$.ajax({
				url: snippetPath
			}).done(function(data){

				if(heading){
					self.getHeading(heading);
				}

				self.$el.addClass("snippet").append("<div><pre class='prettyprint' >" + _.escape(data) + "</pre></div>");
				prettyPrint();
			});
		},

		getSnippet: function(){


			var self = this,
				snippet = this.model.get("snippet"),
				heading = this.model.get("title");

			if($.isPlainObject(snippet)){
				_.each(snippet, function(snippetPath, heading){
					self.setSnippet(snippetPath, heading);
					return false;
				});

			}else{
				this.setSnippet(snippet, heading);
			}
		}
	});

	return Slide;
});