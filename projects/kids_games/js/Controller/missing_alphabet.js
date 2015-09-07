/* 
Notes: 

// Init audio and set time
var mediaElement = document.getElementById('audioPlayer');	
mediaElement.currentTime = 1; 

//Below code used for every time check
mediaElement.addEventListener("timeupdate", function() {
	console.log(mediaElement.currentTime);
}, false);

 */

$(document).ready(function(){
	missingAlpha.init();
});

missingAlpha={};

missingAlpha.init= function(){
	missingAlpha.globalData;
	missingAlpha.globalCnt=0;
	missingAlpha.loadData();	
	$("#btn-restart").hide();
	$("#btn-check").removeAttr('disabled');
	$("#btn-next").attr('disabled','disabled');
	missingAlpha.mediaElement = document.getElementById('audioPlayer');	
	missingAlpha.tickElement = document.getElementById('tickClick');	
}

missingAlpha.loadData = function(){
	$.getJSON('database/missing_alphabet.json', function(data){		
	}).done(function(data){
		missingAlpha.globalData=data.page;		
		missingAlpha.totCorrect=0;		
		missingAlpha.showData();
		missingAlpha.addEvents();
	});
}

missingAlpha.showData = function(){	
		$("#questionText").text("");
		for(var i=0;i<missingAlpha.globalData[missingAlpha.globalCnt].QuesText.length;i++){		
			$("#questionText").append("<span>"+missingAlpha.globalData[missingAlpha.globalCnt].QuesText.charAt(i)+"</span>");
		}
		
		$("#option1").html("<h4 data-startaudio="+missingAlpha.globalData[missingAlpha.globalCnt].Opt1[0].start_time+"><img src="+missingAlpha.globalData[missingAlpha.globalCnt].Opt1[0].imagePath+" height='80' width='80'/></h4>");
		$("#option2").html("<h4 data-startaudio="+missingAlpha.globalData[missingAlpha.globalCnt].Opt2[0].start_time+"><img src="+missingAlpha.globalData[missingAlpha.globalCnt].Opt2[0].imagePath+" height='80' width='80'/></h4>");
		$("#option3").html("<h4 data-startaudio="+missingAlpha.globalData[missingAlpha.globalCnt].Opt3[0].start_time+"><img src="+missingAlpha.globalData[missingAlpha.globalCnt].Opt3[0].imagePath+" height='80' width='80'/></h4>");
		$("#option4").html("<h4 data-startaudio="+missingAlpha.globalData[missingAlpha.globalCnt].Opt4[0].start_time+"><img src="+missingAlpha.globalData[missingAlpha.globalCnt].Opt4[0].imagePath+" height='80' width='80'/></h4>");
		$("#option"+missingAlpha.globalData[missingAlpha.globalCnt].CorrectAns).addClass('correct');
		if(missingAlpha.globalData.length==(missingAlpha.globalCnt+1)){
			$("#btn-next").attr("disabled","disabled");
		}
}

missingAlpha.addEvents = function(){
	$(".option").click(function(){
		if($(this).attr('data-disabled')!="disabled"){
			$('.option').attr('data-disabled','disabled');
			$(".option").removeClass('selected');
			$(this).addClass('selected');		
			//console.log($(this).children('h4').attr('data-startaudio'));
			missingAlpha.mediaElement.currentTime = $(this).children('h4').attr('data-startaudio');
			missingAlpha.mediaElement.play();
			setTimeout(function(){
				missingAlpha.mediaElement.pause();
				$('.option').removeAttr('data-disabled');
			},1300);
		}
	});
	
	$(".option").on("mouseenter",function(){		
		missingAlpha.tickElement.currentTime = 0;
		missingAlpha.tickElement.play();
	});
	
	$("#btn-check").click(function(){
		if($(".option.selected").length>0){
			if($(".correct.selected").length>0){
				missingAlpha.totCorrect++;
				$("#answerText").addClass('text-success');
				$("#answerText").html("That's Correct !!!");
			}
			else{
				$("#answerText").addClass('text-danger');
				$("#answerText").html("Opps !!! Wrong Answer. Correct answer in Green");
			}			
			$(".option").addClass('optWrong');			
			$(".correct").removeClass('optWrong');
			$(".correct").addClass('optCorrect');		
			$(this).attr('disabled','disabled');
			$("#btn-next").removeAttr('disabled');
			$(".option").attr('data-disabled','disabled');
			if(missingAlpha.globalData.length==(missingAlpha.globalCnt+1)){
				$("#btn-next").attr('disabled','disabled');
				alert('Congratulations !!! You have completed the Test, Your Score is '+ missingAlpha.totCorrect);
				$("#btn-restart").show();
			}
		}
		else{
			alert('Please Select atleast one option');
		}
	});
	
	$("#btn-next").click(function(){		
		$("#answerText").removeClass("text-danger");
		$("#answerText").removeClass("text-success");
		$("#answerText").html("");
		$(".option").removeClass("optCorrect");
		$(".option").removeClass("optWrong");
		$(".option").removeClass("selected");
		$(".option").removeClass("correct");
		$(this).attr('disabled','disabled');
		$("#btn-check").removeAttr('disabled');
		$(".option").removeAttr('data-disabled');
		missingAlpha.globalCnt++;
		missingAlpha.showData();		
	});
	
	$("#btn-restart").click(function(){
			window.location.reload();
	});
};