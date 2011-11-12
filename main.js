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
		canvas.clearRect(0, 0, width, height);
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
			self.endGameFail();
		}
		
		if(player.isAtEnd(terrain)){
			self.endGameSuccess();
		}
		
		terrain.draw(canvas);
		player.draw(canvas);
	}
	
	self.endGameFail = function() {
		terrain.stopMoving();
		canvas.font = "30pt Calibri";
		canvas.textAlign = "center";
		canvas.fillStyle = "red";
		canvas.fillText("Game Over!", width / 2, height / 3);
		
		// pause for a few seconds
		setTimeout(self.resetFail, 3000);
	}
	
	self.endGameSuccess = function() {
		
		terrain.stopMoving();
		canvas.font = "30pt Calibri";
		canvas.textAlign = "center";
		canvas.fillStyle = "gold";
		canvas.fillText("Congratulations!", width / 2, height / 3);
		
		// pause for a few seconds
		setTimeout(self.resetSuccess, 3000);
	}
	
	self.resetFail = function() {
		
		self.reset();
		
		// do the level again
		terrain.reset();
	}
	
	self.resetSuccess = function() {
		
		self.reset();
		
		// new terrain plz
		terrain.generateNew();
	}
	
	self.reset = function() {
		
		// clear canvas
		self.clear();
		player.reset();
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