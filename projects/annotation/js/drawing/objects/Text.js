var Text = function(){
	
	this.writeText = function(Textstring, color, fontsz, x, y){
		
		var text = new fabric.Text(Textstring,{
		  fontSize: fontsz,
		  left: x,
		  top: y,
		  fill: color
		});
		text.on('selected', function() {			
			$('#popupBox').show();
			$('#heightWidthCtrls').hide();
			$('#circleCtrls').hide();
			$('#textCtrls').show();
			/* $("#xcord").val(x);
			$("#ycord").val(y);
			$("#textval").val(Textstring);
			$("#color").val(color); */
		});
		mainObject = text;
		return text;
	}
}