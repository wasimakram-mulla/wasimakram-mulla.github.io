var Image1 = function(){

	this.drawImage = function(canvas, x, y, h, w, deg, opac){
		fabric.Image.fromURL('up1.png', function(oImg) {
			canvas.add(oImg);
		}, {
          left: x,
		  top: y,
		  height:h,
		  width:w,
		  angle: deg,
		  opacity: opac
		});
	}
}