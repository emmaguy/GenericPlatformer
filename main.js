function Main() {
	var self = this;
	var canvas;
	var blockSize = 32;
	var width;
	var height;
	var backgroundColour = "#fff";
	var player;
	var keys = {};
	var terrain;
	
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
				player.moveLeft(terrain);
				break;
			case "38": // up key
				player.jump(terrain);
				break;
			case "39": // right key
				player.moveRight(terrain);
				break;
			}
		}
		
		player.move(terrain);
		
		terrain.draw(canvas);
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
			terrain = new Terrain(width, height);
				
			setInterval(self.draw, 10);
		}
}