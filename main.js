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
		
		var diff = player.getDiffYLocNextTerrainBlockHeight(terrain);

		// 10 gives a bit of contingency - i.e. player can land
		// just on the corner and get away with it
		if(player.isDead() || diff > 10){
			self.gameOver();
		}
		
		if(player.isAtEnd(terrain)){
			self.gameOver();
		}
		
		terrain.draw(canvas);
		player.draw(canvas);
	}
	
	self.gameOver = function() {
		terrain.stopMoving();
		
		// notify the user and reset
		canvas.font = "30pt Calibri";
		canvas.textAlign = "center";
		canvas.fillStyle = "red";
		canvas.fillText("Game Over!", width / 2, height / 3);
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