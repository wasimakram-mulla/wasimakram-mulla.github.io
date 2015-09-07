$(document).ready(function(){
	phonics.init();
});

var phonics= {};

phonics.init = function(){
	phonics.globalData;
	phonics.audioelement=document.getElementById('phonicsAudio');
	$("#mainImg, #charText").hide();
	phonics.loadData();
};

phonics.loadData = function(){
	$.getJSON('database/phonics.json', function(data){		
	}).done(function(data){
		phonics.globalData=data.page;
		phonics.addAudios();
		phonics.addEvents();
	});
};

phonics.addAudios = function(){
	for(var i=0;i<phonics.globalData.length;i++){
		$("#charImgs"+i).attr("data-imagePath",phonics.globalData[i].characterImage);
		$("#charImgs"+i).attr("title",phonics.globalData[i].characterText);
		$("#charImgs"+i).attr("data-starttime",phonics.globalData[i].audioStartTime);
		$("#charImgs"+i).attr("data-endtime",phonics.globalData[i].audioEndTime);
	}
};

phonics.addEvents = function(){
	$(".charImgs").click(function(){
		if($(this).attr('data-disabled')!='disabled'){
			$("#mainImg").attr("src",$(this).attr("data-imagePath"));
			$("#charText").html($(this).attr("title"));
			$(".charImgs.A,.charImgs.B,.charImgs.C,.charImgs.D").attr('data-disabled','disabled');
			phonics.audioelement.currentTime = $(this).attr('data-starttime');
			phonics.audioelement.play();
			$("#mainImg, #charText").show();
			setTimeout(function(){
				phonics.audioelement.pause();
				$(".charImgs.A,.charImgs.B,.charImgs.C,.charImgs.D").removeAttr('data-disabled');
			},5000);
		}
	});
};