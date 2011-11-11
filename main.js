function Main() {
	var self = this;
	var canvas;
	var blockSize = 32;
	var width;
	var height;
	var backgroundColour = "#fff";
	var player;
	var keys = {};
	var terrain = new Array();
	
	self.clear = function() {
		canvas.fillStyle = backgroundColour;
		canvas.fillRect(0, 0, width, height);
	}
	
	self.draw = function() {
		self.clear();
		
		var x = 0;
		for(var i = 0; i < terrain.length; i++) {
			canvas.fillStyle = "#308014";
			canvas.fillRect(x++ * blockSize, height - terrain[i], blockSize, terrain[i]);
		}

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
		player.move(terrain);
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
			for(var i = 0; i < width / blockSize; i++) {
				terrain[i] = Math.ceil(Math.random() * 4) * blockSize;
			}
				
			setInterval(self.draw, 10);
		}
}