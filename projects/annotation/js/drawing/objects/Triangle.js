var Triangle = function(){
	
	this.drawTriangle = function(x, y, color, strokeclr, opac, width, height){
		
		var Tri = new fabric.Triangle({
		  left: x,
		  top: y,
		  fill: color,
		  strokeWidth: 1,
		  stroke: strokeclr,
		  opacity: opac,
		  width: width,
		  height: height
		});
		return Tri;
	}
}