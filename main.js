function Main() {
	var self = this;
	var canvas;
	var width;
	var height;
	var backgroundColour = "#fff";
	
	self.clear = function() {
		canvas.fillStyle = backgroundColour;
		canvas.fillRect(0, 0, width, height);
	}
	
	self.draw = function() {
		self.clear();
		
	}
	
	var cvs = document.getElementById("cvsBackground");
		if (cvs.getContext) {
			canvas = cvs.getContext("2d");
			width = cvs.width;
			height = cvs.height;
				
			setInterval(self.draw, 10);
		}
}