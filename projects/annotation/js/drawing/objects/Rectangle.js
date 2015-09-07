var Rectangle = function(){
	
	this.drawRectangle = function(x, y, color, strokeclr, opac, width, height){
		
		var rect = new fabric.Rect({
		  left: x,
		  top: y,
		  fill: color,
		  strokeWidth: 1, 
		  stroke: strokeclr,	  
		  opacity: opac,
		  width: width,
		  height: height  
		});
		
		rect.on('selected', function() {			
			$('#popupBox').show();
			$('#circleCtrls').hide();
			$('#heightWidthCtrls').show();
			$('#textCtrls').hide();
		});
		/* rect.sendBackwards(true); */
		mainObject = rect;
		return rect;
	}
}