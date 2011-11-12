function Terrain(width, height) {

	var self = this;
	var terrainLength = 50;
	var blockSize = 32;
	var maxHeight = 4;
	var terrain = new Array();
	var scrollDist = 0;
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
	
	self.getIndexOfCurrentTerrainBlock = function(playerXLoc) {
		return Math.floor(playerXLoc / blockSize);	
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
		return (playerXLoc % blockSize != 0)
	}
	
	self.isExactlyOnBlockOrEdge = function(playerXLoc) {
		var size = (playerXLoc / blockSize);
		var remainder = size - Math.floor(size);
		return (playerXLoc % blockSize == 0 || remainder < 0.05);
	}
	
	for(var i = 0; i < terrainLength; i++) {
		terrain[i] = Math.floor(Math.random() * maxHeight) * blockSize;
		if(i <= 3) {
			// don't want 0 blocks on any of the first few blocks
			terrain[i] += blockSize;
		}
	}
}