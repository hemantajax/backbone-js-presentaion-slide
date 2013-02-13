define(['backbone'], function(Backbone) {
	
	var Slide = Backbone.Model.extend({
		initialize: function(){
			this.setFontSize();
		},

		defaults:{
			type:'note',
			title: ""
		},

		setFontSize: function(){
			var length = this.get("title").length,
				size;

			if(length >= 200){
				size = "x-large";
			}
			else if(length >= 100){
				size = "large";
			}else{
				size = "noraml";
			}

			this.set("size", size);	
		}
	});

	return Slide;
});