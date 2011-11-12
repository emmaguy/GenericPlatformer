function Player(canvasWidth, canvasHeight) {
	var self = this;
	var height = 32;
	var width = 32;
	var x = 0;
	var y = 0;
	
	var jumping = false;
	var jumpVel = 2;
	var jumpHeight = 0;
	var jumpMultiplier = 3;
	var fallVel = jumpVel + 1;
	
	var imgPlayer = new Image();
	imgPlayer.src = 'player.png';
	
	self.draw = function(canvas) {
		canvas.drawImage(imgPlayer, x, y);
	}

	// gravity
	self.move = function(terrain) {
		
		if(!jumping) {
			var isAbove = terrain.isPlayerAboveGround(x, self.getPlayerYLoc(), width);
			if(isAbove) {
				y += fallVel;
				return;
			}
		}
		if(jumpHeight > self.getPlayerYLoc()) {
			y -= jumpVel;
		}
		else {
			jumpHeight = 0;
			jumping = false;
		}
	}
	
	self.getPlayerYLoc = function(){
		return canvasHeight - y - height;
	}
	
	self.jump = function(terrain) {
		// only one jump at a time
		if(!jumping)
		{
			jumping = true;
			jumpHeight = height * jumpMultiplier  + terrain.heightAt(x);
		}
	}
	
	self.moveLeft = function(terrain) {	
		// if the block to the left is too high we can't move		
		var canMoveLeft = terrain.canMoveLeft(x, self.getPlayerYLoc());
		if(canMoveLeft) {
			x--;
		}
	}
	
	self.moveRight = function(terrain) {	
		// if the block to the left is too high we can't move		
		var canMoveRight = terrain.canMoveRight(x, self.getPlayerYLoc());
		if(canMoveRight) {
			x++;
		}
	}
}