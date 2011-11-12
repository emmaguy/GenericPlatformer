function Main() {
	var self = this;
	var canvas;
	var width;
	var height;
	var backgroundColour = "#aaf";
	var player;
	var keys = {};
	var terrain;
	var terrainMoving = true;
	
	self.clear = function() {
		canvas.fillStyle = backgroundColour;
		canvas.fillRect(0, 0, width, height);
	}
	
	self.draw = function() {
		self.clear();
	
		for (var i in keys) {
			// deal with any keys being pressed right now
			terrainMoving = false;
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
		
		if(!terrainMoving) {
			terrain.startMoving();
			terrainMoving = true;
		}
		
		player.move(terrain);

		if(player.isDead() || player.isKilledByLHSOfScreen()){
			self.endGame("Game Over!", "red");
		}
		
		if(player.isAtEnd(terrain)){
			self.endGame("Congratulations!", "gold");
		}
		
		terrain.draw(canvas);
		player.draw(canvas);
	}
	
	self.endGame = function(msg, colour) {
		terrain.stopMoving();
		
		// notify the user and reset
		canvas.font = "30pt Calibri";
		canvas.textAlign = "center";
		canvas.fillStyle = colour;
		canvas.fillText(msg, width / 2, height / 3);
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