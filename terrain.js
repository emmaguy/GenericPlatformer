function Terrain(width, height) {

	var self = this;
	var blockSize = 32;
	var maxHeight = 4;
	var terrain = new Array();
		
	self.draw = function(canvas) {
		
		var x = 0;
		for(var i = 0; i < terrain.length; i++) {
			canvas.fillStyle = "#308014";
			canvas.fillRect(x++ * blockSize, height - terrain[i], blockSize, terrain[i]);
		}
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
	
	for(var i = 0; i < width / blockSize; i++) {
		terrain[i] = Math.ceil(Math.random() * maxHeight) * blockSize;
	}
}