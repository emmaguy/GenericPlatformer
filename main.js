function Main() {
	var self = this;
	var canvas;
	var width;
	var height;
	var backgroundColour = "#fff";
	var player;
	var keys = {};
	
	self.clear = function() {
		canvas.fillStyle = backgroundColour;
		canvas.fillRect(0, 0, width, height);
	}
	
	self.draw = function() {
		self.clear();

		for (var i in keys) {
			// deal with any keys being pressed right now
			switch(i)
			{
			case "37": // left key
				player.moveLeft();
				break;
			case "38": // up key
				player.jump();
				break;
			case "39": // right key
				player.moveRight();
				break;
			}
		}
		player.move(height);
		player.draw(canvas);
	}
	
	self.onKeyDown = function(keyspressed) {
		keys[keyspressed] = true;
	}
	
	self.onKeyUp = function(keyspressed) {
		delete keys[keyspressed];
	}
	
	var cvs = document.getElementById("cvsBackground");
		if (cvs.getContext) {
			canvas = cvs.getContext("2d");
			width = cvs.width;
			height = cvs.height;
				
			player = new Player(width, height);
				
			setInterval(self.draw, 10);
		}
}