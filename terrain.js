function Terrain(width, height) {

	var self = this;
	
	var maxHeight = 4;
	var blockSize = 32;
	var scrollDist = 0;
	var terrainLength = 50;
	var terrain = new Array();
	var moving = false;
		
	self.draw = function(canvas) {
		
		for(var i = 0; i < terrain.length; i++) {
			canvas.fillStyle = "#308014";
			canvas.fillRect(i * blockSize - scrollDist, height - terrain[i], blockSize, terrain[i]);
		}
		if(moving) {
			scrollDist++;
		}
	}
	
	self.startMoving = function() {
		moving = true;
	}
	
	self.stopMoving = function() {
		moving = false;
	}
	
	self.isAtEndOfTerrain = function(playerXLoc) {
		var ind = self.getIndexOfCurrentTerrainBlock(playerXLoc);
		return ind + 1 >= terrain.length;
	}
	
	self.getIndexOfCurrentTerrainBlock = function(playerXLoc) {
		return Math.floor((playerXLoc + scrollDist) / blockSize);	
	}
	
	self.heightAt = function(playerXLoc) {
		var ind = self.getIndexOfCurrentTerrainBlock(playerXLoc);
		return terrain[ind];
	}
	
	self.heightAtPreviousBlock = function(playerXLoc) {
		var ind = self.getIndexOfCurrentTerrainBlock(playerXLoc);
		return terrain[ind - 1];
	}
	
	self.heightAtNextBlock = function(playerXLoc) {
		var ind = self.getIndexOfCurrentTerrainBlock(playerXLoc);
		return terrain[ind + 1];
	}
	
	self.isMidBlock = function(playerXLoc) {
		return (playerXLoc % blockSize !== 0)
	}
	
	self.isExactlyOnBlockOrEdge = function(playerXLoc) {
		var size = (playerXLoc / blockSize);
		var remainder = size - Math.floor(size);
		return (playerXLoc % blockSize === 0 || remainder < 0.05);
	}
	
	self.reset = function() {
		scrollDist = 0;
		moving = false;
	}
	
	self.generateNew = function() {
		for(var i = 0; i < terrainLength; i++) {
			terrain[i] = Math.floor(Math.random() * maxHeight) * blockSize;
			if(i <= 3 || i > terrainLength - 3) {
				// don't want 0 blocks on any of the first few/end blocks
				// make it a consistent height
				terrain[i] = blockSize * 2;
			}
		}
		
		self.reset();
	}
	
	self.generateNew();
}