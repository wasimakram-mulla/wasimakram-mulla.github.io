var tmpText;
var ShowToolBoxflag=false;
var mainObject;
var demoObject;
var clickedObj;
var currentSelectObj;
var tmpCanvas;

var MainController = function(){
	var canvas;
	this.init = function(){
		canvas = new fabric.Canvas('painting');
		$("#startAnnotation").click(function(){
			if(!ShowToolBoxflag){
				$("#toolBox").show();
				ShowToolBoxflag=true;
			}
		});
		
		$(".canvas-container").bind("contextmenu", function(e) {
			/* 
			checkEmptyTextBoxes();		  
			  //e.pageX + ", " + e.pageY;*/
			  if(!canvas.isEmpty()){
				  $(".showBlock").show();
				  $(".showBlock").css({
					"left": e.pageX,
					"top": e.pageY
				  });
			  }
				return false;
		});
		
		$("#closeToolBox").click(function(){
			hidePopUp();
			$("#toolBox").hide();
			ShowToolBoxflag=false;
		});
		
		$("#rect").click(function(){
			hidePopUp();
			var color=$("#colorpicker").val();
			var bcolor=$("#borderclr").val();
			canvas.add(new Rectangle().drawRectangle(300, 10, color, bcolor, 1, 180, 180));
		});
		
		$("#circle").click(function(){
			hidePopUp();
			var color=$("#colorpicker").val();
			var bcolor=$("#borderclr").val();
			canvas.add(new Circle().drawCircle(0, 0, color, bcolor, 1, 90));
		});
		
		$("#rectopaque").click(function(){
			hidePopUp();
			var color=$("#colorpicker").val();
			var bcolor=$("#borderclr").val();
			canvas.add(new Rectangle().drawRectangle(300, 200, color, bcolor, 0.5, 80, 80));
		});
		
		$("#triangle").click(function(){
			hidePopUp();
			var color=$("#colorpicker").val();
			var bcolor=$("#borderclr").val();
			canvas.add(new Triangle().drawTriangle(350, 350, color, bcolor, 1, 40, 50));
		});
	
		$("#text").click(function(){
			hidePopUp();
			var txt=prompt('Enter Your String to Add on Canvas');
			var color=$("#colorpicker").val();
			canvas.add(new Text().writeText(txt, color, 30, 20, 350));
			//canvas.add(tmpText);
		});
			
		$("#sendBackwards").click(function(){
			demoObject.sendBackwards(true);
			$(".showBlock").hide();
		});
			
		$("#sendToBack").click(function(){
			demoObject.sendToBack();
			$(".showBlock").hide();
		});
			
		$("#bringForward").click(function(){
			demoObject.bringForward(true);
			$(".showBlock").hide();
		});
			
		$("#bringToFront").click(function(){
			demoObject.bringToFront();
			$(".showBlock").hide();
		});
		canvas.on('mouse:up', function(options) {
			//tmpCanvas=canvas;
			 $(".showBlock").hide();
			if(options.target!=undefined){				
				if (options.target.type=="rect") {
					//options.target.sendBackwards(true);
					demoObject=options.target;					
					clickedObj=options.target.type;					
				}
				else if(options.target.type=='text'){
					demoObject=options.target;					
					clickedObj=options.target.type;
				}
				else if(options.target.type=='circle'){					
					demoObject=options.target;
					clickedObj=options.target.type;
				}
				else{
					return false;
				}
			} 		
		});
		canvas.on('object:selected', this._canvasObjSelectedHandler);
		canvas.on('object:moving', this._canvasObjSelectedHandler);
		canvas.on('object:resizing', this._canvasObjSelectedHandler);
		canvas.on('object:scaling', this._canvasObjSelectedHandler);
	
	
	$("#makeObject").on("click",function(){		
		if(clickedObj=="rect"){
			mainObject.setLeft(parseInt($("#xcord").val(), 10)).setCoords();
			mainObject.setTop(parseInt($("#ycord").val(), 10)).setCoords();
			mainObject.setHeight(parseInt($("#height").val(), 10)).setCoords();
			mainObject.setWidth(parseInt($("#width").val(), 10)).setCoords();
			mainObject.setColor($("#color").val(), 10).setCoords();
		}
		else if(clickedObj=="text"){
			mainObject.setLeft(parseInt($("#xcord").val(), 10)).setCoords();
			mainObject.setTop(parseInt($("#ycord").val(), 10)).setCoords();
			mainObject.setColor($("#color").val(), 10).setCoords();
			mainObject.setText($("#textval").val(), 10).setCoords();
		}
		else if(clickedObj=='circle'){					
			mainObject.setLeft(parseInt($("#xcord").val(), 10)).setCoords();
			mainObject.setTop(parseInt($("#ycord").val(), 10)).setCoords();
			mainObject.setColor($("#color").val(), 10).setCoords();
		}
			canvas.renderAll();
			$('#popupBox').hide();
		});
	
	}
	
	this._canvasObjSelectedHandler = function(event){
		//$("#popupBox").show();		
		currentSelectObj = canvas.getActiveObject();		
		 $("#xcord").val(parseInt(currentSelectObj.getLeft(), 10));
		 $("#ycord").val(parseInt(currentSelectObj.getTop(), 10));
		if(currentSelectObj.type=="rect"){
			 $("#width").val(parseInt(currentSelectObj.getWidth(), 10));
			 $("#height").val(parseInt(currentSelectObj.getHeight(), 10));
		}
		if(currentSelectObj.type=="text"){
			$("#textval").val(currentSelectObj.getText());
		}
		//$("#color").val(currentSelectObj.getColor());
		
		if(currentSelectObj.type=="circle"){
			//$("#circRad").val(parseInt(currentSelectObj.getRadius(), 10));
		}
		 $("#objOpacity").val(parseFloat(currentSelectObj.getOpacity()));
		 
	}
}

function hidePopUp(){
	$("#popupBox").hide();
	$('#xcord').val("");
	$('#ycord').val("");
	$('#height').val("");
	$('#width').val("");
	$('#color').val("#000000");
}

