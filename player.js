function Player(canvasWidth, canvasHeight) {
	var self = this;
	var height = 32;
	var width = 32;
	var x = 0;
	var y = 0;
	var jumping = true;
	var fallSpeed = 2;
	var jumpHeight = height * 3;
	var imgPlayer = new Image();
	imgPlayer.src = 'player.png';
	
	self.draw = function(canvas) {
		canvas.drawImage(imgPlayer, x, y);
	}

	// gravity
	self.move = function(terrain) {
		if(y + height < canvasHeight - terrain[Math.floor(x / width)]) {
			y += fallSpeed;
		}
		else {
			jumping = false;
		}
	}
	
	self.jump = function() {
		if(!jumping)
		{
			jumping = true;
			y -= jumpHeight;
		}
	}
	
	self.moveLeft = function(terrain) {	
		// if the block to the left is too high we can't move
		
		x--;
	}
	
	self.moveRight = function(terrain) {	
		x++;
	}
}