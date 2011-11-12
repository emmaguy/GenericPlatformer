function Terrain(width, height) {

	var self = this;
	var blockSize = 32;
	var maxHeight = 3;
	var terrain = new Array();
		
	self.draw = function(canvas) {
		
		var x = 0;
		for(var i = 0; i < terrain.length; i++) {
			canvas.fillStyle = "#308014";
			canvas.fillRect(x++ * blockSize, height - terrain[i], blockSize, terrain[i]);
		}
	}
	
	self.canMoveLeft = function(playerXLoc, playerYLoc) {

		// we're mid block so go to the edge
		if(playerXLoc % blockSize != 0)
			return true;
		
		var ind = self.getIndexOfCurrentTerrainBlock(playerXLoc);
		var previousBlockHeight = terrain[ind - 1];
				
		// the player's y location is bigger than the previous block's height
		if(playerYLoc >= previousBlockHeight)
			return true;

		return false;
	}
	
	self.canMoveRight = function(playerXLoc, playerYLoc) {
		
		// we're mid block so go to the edge
		if(playerXLoc % blockSize != 0)
			return true;
		
		var ind = self.getIndexOfCurrentTerrainBlock(playerXLoc);
		var nextBlockHeight = terrain[ind + 1];
				
		// the player's y location is bigger than the next block's height
		if(playerYLoc >= nextBlockHeight)
			return true;

		return false;
	}
	
	self.getIndexOfCurrentTerrainBlock = function(playerXLoc) {
		return Math.floor(playerXLoc / blockSize);	
	}
	
	self.isPlayerAboveGround = function(playerXLoc, playerYLoc, playerWidth) {
		
		// get left corner and right corner
		var ind = self.getIndexOfCurrentTerrainBlock(playerXLoc);
		var leftCorner = terrain[ind];
		var rightCorner = terrain[ind + 1];
		
		// if we're exactly on a block just consider
		// that block beneath us (or either side if very close to edge)
		var blockBeneath = playerYLoc > leftCorner;
		
		var size = (playerXLoc / blockSize);
		var remainder = size - Math.floor(size);
		if(playerXLoc % blockSize == 0 || remainder < 0.05)
		{
			return blockBeneath;
		}
			
		// otherwise consider height of blocks to left and to right
		return blockBeneath && playerYLoc > rightCorner;
	}
	
	for(var i = 0; i < width / blockSize; i++) {
		terrain[i] = Math.ceil(Math.random() * maxHeight) * blockSize;
	}
}