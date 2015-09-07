/* 
Core Logic of Slider is push all images in Array. and shuffle its Z-index according to the image position in Array
 */
 
$(document).ready(function(){
	zindexSlider.init();
});


var GlobalArrayImages=[];
zindexSlider={

}

zindexSlider.init= function(){
	var Zindexcnt=0;
	$(".SliderWrapper img").each(function(){
		$(this).attr("style",'z-index:'+Zindexcnt);
		GlobalArrayImages[Zindexcnt]=$(this).attr('id');
		Zindexcnt++;
	});
	zindexSlider.clickFunctions();
}


zindexSlider.clickFunctions= function(){
	$("#nextBtn").click(function(){
		var lastSliderNode=GlobalArrayImages[GlobalArrayImages.length-1];
		console.log(lastSliderNode);
			GlobalArrayImages.pop();
		
		$("#"+lastSliderNode).animate({
				left:800
			},800,function(){
				for(var i=0;i<GlobalArrayImages.length;i++){
					$("#"+GlobalArrayImages[i]).attr("style",'z-index:'+(i+1));
				}
			
			for(var j=GlobalArrayImages.length;j>=1;j--)
			{
				var tmp=GlobalArrayImages[j];
				GlobalArrayImages[j]=GlobalArrayImages[j-1];
				GlobalArrayImages[j-1]=tmp;
			}
			GlobalArrayImages[0]=lastSliderNode;
			$("#"+lastSliderNode).css('z-index',0);
				$("#"+lastSliderNode).animate({
					left:0
				},800);
		});
	});
	
	$("#backBtn").click(function(){
		for(var j=0;j<GlobalArrayImages.length-1;j++)
		{
			var tmp=GlobalArrayImages[j];
			GlobalArrayImages[j]=GlobalArrayImages[(j+1)];
			GlobalArrayImages[(j+1)]=tmp;
		}
		var tmpFirstElem=GlobalArrayImages[GlobalArrayImages.length-1];
		$("#"+tmpFirstElem).animate({
			left:"-800px"
		},800,function(){
			for(var i=0;i<GlobalArrayImages.length-1;i++){
				$("#"+GlobalArrayImages[i]).attr("style",'z-index:'+i);
			} 
			$("#"+tmpFirstElem).css('z-index',6);		
			 $("#"+tmpFirstElem).animate({
				left:0
			},800); 
		});
	});
	
	$(document).keyup(function(e) {
		if(e.keyCode==39 || e.keyCode==38)
		{
			$("#nextBtn").trigger("click");
		}
		
		if(e.keyCode==37 || e.keyCode==40)
		{
			$("#backBtn").trigger("click");
		}
	});
}