function Player(canvasWidth, canvasHeight) {
	var self = this;
	var height = 50;
	var width = 8;
	var x = width;
	var y = canvasHeight - height;
	
	self.draw = function(canvas) {
		canvas.fillStyle = "#000";
		canvas.fillRect(x, y, width, height); 
	}

	self.move = function(maxheight) {
		if(y + height < maxheight)
			y += 5;
	}
	
	self.jump = function() {	
		y -= 10;
	}
	
	self.moveLeft = function() {	
		x--;
	}
	
	self.moveRight = function() {	
		x++;
	}
}