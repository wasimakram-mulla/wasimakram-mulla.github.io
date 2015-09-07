var Circle = function(){
	
	this.drawCircle = function(x, y, color, strokeclr, opac, rad){
		
		var circ = new fabric.Circle({
		  left: x,
		  top: y,
		  fill: color,
		  strokeWidth: 1,
		  stroke: strokeclr,
		  opacity: opac,
		  radius: rad
		});
		circ.on('selected', function() {			
			$('#popupBox').show();
			$('#heightWidthCtrls').hide();
			$('#circleCtrls').show();
			$('#textCtrls').hide();
			/* $("#xcord").val(x);
			$("#ycord").val(y);
			$("#circRad").val(rad);
			$("#color").val(color); */
		});
		mainObject = circ;
		return circ;
	}
}