$(document).ready(function(){
	flipQuiz.init();
});

var flipQuiz = { };

flipQuiz.init = function(){
	flipQuiz.resetData();
	flipQuiz.masterData;
	flipQuiz.RandomArr=[];
	flipQuiz.requireRandomVals=true;
	flipQuiz.fetchData();
	flipQuiz.correctAns=0;
};

flipQuiz.callEvents = function(){
	$(".showQuiz").bind("click", function(){
		$(".optText").removeAttr("data-disabled");
		flipQuiz.showQuizClickevt(this);
	});
	
	$(".optText").bind("click", function(){
		if($(this).attr("data-disabled")!="disabled"){
			$(".optText").removeClass("selected");
			$(this).addClass("selected");
		}
	});
	
	$(".submitBtn .btn").bind("click", function(){
		flipQuiz.submitAnswer();
	});
	
	$(".resetQuizBtn").bind("click", function(){
		flipQuiz.resetQuiz(this);
	});
};

flipQuiz.fetchData = function(){	
	$.getJSON('database/data.json', function(data){
		flipQuiz.masterData=data.Questions;	
	}).done(function(){		
		//console.log(flipQuiz.masterData);
		for(var i=0;i<flipQuiz.masterData.length;i++){
			flipQuiz.RandomArr.push(i);
		}
		flipQuiz.pushDataIntoFlipDivs();
	});
};

flipQuiz.pushDataIntoFlipDivs = function(){	
	if(flipQuiz.requireRandomVals){
		for(var i=0;i<flipQuiz.masterData.length;i++){
		var tmpCnt = flipQuiz.randomNumberGenerator();
			$(".row.mainContent").append('<div class="col-6 col-sm-6 col-lg-4"><div class="tiles" data-Qflipid="'+flipQuiz.masterData[tmpCnt].QuesId+'"><h2>'+flipQuiz.masterData[tmpCnt].QuesText+'</h2><p><a class="btn btn-warning showQuiz" href="#" role="button">Show Quiz &raquo;</a></p></div></div>')
		}
	}
	else{
		for(var i=0;i<flipQuiz.masterData.length;i++){
			$(".row.mainContent").append('<div class="col-6 col-sm-6 col-lg-4"><div class="tiles" data-Qflipid="'+flipQuiz.masterData[i].QuesId+'"><h2>'+flipQuiz.masterData[i].QuesText+'</h2><p><a class="btn btn-warning showQuiz" href="#" role="button">Show Quiz &raquo;</a></p></div></div>')
		}		
	}	
	flipQuiz.callEvents();
};

flipQuiz.submitAnswer = function(){
if($(".optText.selected").length!=0){
			if($(".optText.selected").attr("data-correct")=="1"){
				flipQuiz.correctAns++;
			}
			$(".optText").attr("data-disabled","disabled");				
			setTimeout(function(){
					$(".quizSection").hide();					
					$(".tiles").parent().show();
					if($(".tiles[data-disabled='disabled']").length==flipQuiz.masterData.length){
						$(".resetQuizBtn").removeClass("btn-default");
						$(".resetQuizBtn").addClass("btn-warning");
						alert("Congratulations! you have completed your QUIZ \n\n\n Your Score is "+flipQuiz.correctAns+" / "+flipQuiz.masterData.length);					
					}
			},1000);
		}
		else{
			alert('Select atleast one Option!');
		}
}

flipQuiz.showQuizClickevt = function(element){
	if($(element).parent().parent().attr("data-disabled")!="disabled"){
			$(".optText").removeClass("selected");
			var superParent=element;
			$(element).parent().parent().flip({
				direction:'lr',
				color:'green',
				speed:400,
				onEnd: function(){
					//console.log('when the animation has already ended');
					var QId=parseInt($(superParent).parent().parent().attr("data-Qflipid"));
					$(element).parent().parent().attr("data-disabled","disabled");
					$(element).removeClass("btn-warning");
					$(element).addClass("btn-default");
					flipQuiz.showQuiz(QId);
				}
			});
	}
};

flipQuiz.showQuiz = function(Qid){
	$(".tiles").parent().hide();
	$(".quizMidSection .QuestionText h3").text(flipQuiz.masterData[Qid].QuesText);
	$(".quizMidSection #optText1 h3").text(flipQuiz.masterData[Qid].Opt1);
	$(".quizMidSection #optText2 h3").text(flipQuiz.masterData[Qid].Opt2);
	$(".quizMidSection #optText3 h3").text(flipQuiz.masterData[Qid].Opt3);
	$(".quizMidSection #optText4 h3").text(flipQuiz.masterData[Qid].Opt4);
	$(".quizMidSection .optText").attr("data-correct","0");
	$(".quizMidSection #optText"+flipQuiz.masterData[Qid].CorrectAns).attr("data-correct","1");
	$(".quizSection").show();
	
};

flipQuiz.randomNumberGenerator = function(){
	if (flipQuiz.RandomArr.length == 0) {
		throw "No numbers left";
	}
	var index = Math.floor(flipQuiz.RandomArr.length * Math.random());	
	var drawn = flipQuiz.RandomArr.splice(index, 1);		
	var val=drawn[0];
	return val;
}

flipQuiz.resetData = function(){	
	$('.tiles').parent().remove();
};

flipQuiz.resetQuiz = function(element){
	if(!$(element).hasClass('btn-default')){
		flipQuiz.init();
	}
	else{
		alert('Visit All Questions first.');
	}
};