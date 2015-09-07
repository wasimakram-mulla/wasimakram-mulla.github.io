$(document).ready(function(){
	mainController.init();
});

mainController = {};

mainController.init = function(){
	mainController.filepath='database/data.json';
	mainController.mainData;
	mainController.mainCnt=0;
	mainController.loadData();	
	$(".score").text('0');
	$(".btn").removeAttr('disabled');
};

mainController.loadData = function(){
	$.getJSON(mainController.filepath, function(data){		
		mainController.mainData=data;
	}).done(function(){
		/* remaining all functions after data load */
		mainController.writeData();
		mainController.addEvents();
	});
};

mainController.writeData = function(){	
	if(mainController.mainCnt!=mainController.mainData.Questions.length){
		$(".questionBar").html(mainController.mainData.Questions[mainController.mainCnt].QuesText);
		$("#opt1").html(mainController.mainData.Questions[mainController.mainCnt].Opt1);
		$("#opt2").html(mainController.mainData.Questions[mainController.mainCnt].Opt2);
		$("#opt3").html(mainController.mainData.Questions[mainController.mainCnt].Opt3);
		$("#opt4").html(mainController.mainData.Questions[mainController.mainCnt].Opt4);
		$("#opt"+mainController.mainData.Questions[mainController.mainCnt].CorrectAns).addClass('correct');
	}
	else{
		alert('Congratulations !!! You are the grand winner of '+$('.score').text());
		mainController.quitQuiz();
	}	
};

mainController.addEvents = function(){	
	$('.option').click(function(){
		if($(this).attr('data-disabled')!='disabled'){
			$('.option').removeClass('selected');
			$(this).addClass('selected');
		}
	});
	
	$('.btn-submit').click(function(){
		if($('.option').hasClass("selected")){
			mainController.checkSubmit();
		}else{
			alert('Select an Option');
		}
	});
	
	$('.btn-quit').click(function(){
		var chk=confirm("Are you sure you want to Quit?");
		if(chk){
			alert('It was nice to Play with you Sir, you take home Rs '+ $('.score').text());
			mainController.quitQuiz();
		}
	});
	
	$('.btn-reset').click(function(){
		mainController.resetQuiz();
	});
};

mainController.checkSubmit = function(){
	if($('.option.selected').hasClass("correct")){	
		mainController.correctAns();
	}else{
		$('.marks').removeClass('levelUp');
		$('.score').text('0');
		alert('OOPS !! You have given the Wrong Answer. You take home only '+ $('.score').text());
		mainController.quitQuiz();
	}
};

mainController.correctAns = function(){
		mainController.mainCnt++;
		$(".marks").removeClass('levelUp');
		$(".marks.level-"+mainController.mainCnt).addClass('levelUp');
		$(".score").text($(".marks.level-"+mainController.mainCnt).text());
		mainController.writeData();
		$('.option').removeClass('selected');
};

mainController.quitQuiz = function(){	
	$('.marks').removeClass('levelUp');
	$('.btn').attr('disabled','disabled');
	$('.option').attr('data-disabled','disabled');
	$('.option').removeClass('selected');
	$('.btn').addClass('disabled');
	$('.option').addClass('disabled');
	$('.score').text('0');
};

mainController.resetQuiz = function(){
	$(".score").text('0');
	$(".btn").removeAttr('disabled');
	$(".btn").removeClass('disabled');
	$('.option').removeClass('disabled');
	$('.option').removeClass('correct');
	$('.option').removeClass('selected');
	$('.option').removeAttr('data-disabled');
	$('.marks').removeClass('levelUp');
	mainController.mainCnt=0;
	mainController.writeData();
};