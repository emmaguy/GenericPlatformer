function Player(canvasWidth, canvasHeight) {
	var self = this;
	var height = 32;
	var width = 32;
	var x = width;
	var y = 0;
	
	var falling = true;
	var heightToJumpTo = 0;
	
	// constants
	var fallVel = 2;
	var jumpVel = 10;
	var jumpMultiplier = 3;
	
	var imgPlayer = new Image();
	imgPlayer.src = 'player.png';
	
	self.reset = function() {
		x = width;
		y = 0;
		faling = true;
	}
	
	self.draw = function(canvas) {
		canvas.drawImage(imgPlayer, x, y);
	}
	
	self.jump = function(terrain) {
		if(!falling) {
			heightToJumpTo = height * jumpMultiplier + terrain.heightAt(x);
		}
	}

	self.move = function(terrain) {
		
		var isAbove = self.isAboveGround(terrain);
		if(heightToJumpTo > 0) {
			if(heightToJumpTo > self.getPlayerYLoc()) {
				y -= jumpVel;
				falling = false;
			}
			else {
				heightToJumpTo = 0;
				falling = true;
			}
		}
		
		if(isAbove) {
			y += fallVel;
		}
		else {
			falling = false;
		}
		
		// check we're not being pushed in to a wall
		var diff = self.getDiffYLocNextTerrainBlockHeight(terrain);
		if(diff > 0){
			x--;
		}
	}
	
	self.isDead = function(terrain) {
		return (self.getPlayerYLoc() <= 0);
	}
	
	self.isKilledByLHSOfScreen = function(terrain) {
		return (x <= (-width/4));
	}
	
	self.isAboveGround = function(terrain) {
		
		// get left corner and right corner
		var leftCorner = terrain.heightAt(x);
		var rightCorner = terrain.heightAtNextBlock(x);
		
		// if we're exactly on a block just consider
		// that block beneath us (or either side if very close to edge)
		var blockBeneath = self.getPlayerYLoc() > leftCorner;
		if(terrain.isExactlyOnBlockOrEdge(x)) {
			return blockBeneath;
		}
			
		// otherwise consider height of blocks to left and to right
		return blockBeneath && self.getPlayerYLoc() > rightCorner;
	}
	
	self.canMoveLeft = function(terrain) {

		// we're mid block so go to the edge
		if(terrain.isMidBlock(x))
			return true;
		
		// the player's y location is bigger than the previous block's height
		if(self.getPlayerYLoc() >= terrain.heightAtPreviousBlock(x))
			return true;

		return false;
	}
	
	self.getDiffYLocNextTerrainBlockHeight = function(terrain) {
		return terrain.heightAtNextBlock(x) - self.getPlayerYLoc();
	}
	
	self.canMoveRight = function(terrain) {
		
		// we're mid block so go to the edge
		if(terrain.isMidBlock(x))
			return true;
		
		// the player's y location is bigger than the next block's height
		if(self.getDiffYLocNextTerrainBlockHeight(terrain) < 0)
			return true;

		return false;
	}
	
	self.isAtEnd = function(terrain) {
		return terrain.isAtEndOfTerrain(x);
	}
	
	self.getPlayerYLoc = function() {
		return canvasHeight - y - height;
	}
	
	self.moveLeft = function(terrain) {	
		// if the block to the left is too high we can't move		
		var canMoveLeft = self.canMoveLeft(terrain);
		if(canMoveLeft) {
			x--;
		}
	}
	
	self.moveRight = function(terrain) {	
		// if the block to the left is too high we can't move		
		var canMoveRight = self.canMoveRight(terrain);
		if(canMoveRight) {
			x++;
		}
	}
}