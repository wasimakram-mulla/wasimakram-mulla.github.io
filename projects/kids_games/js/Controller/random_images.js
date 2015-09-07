$(document).ready(function(){
	randomImgs.init();
});

var randomImgs={};

randomImgs.init = function(){
	randomImgs.globalData;
	randomImgs.globalArray=new Array();
	randomImgs.loadData();
	$("#btn-next").attr("disabled","disabled");
	randomImgs.correctAnswer = document.getElementById('correctAnswer');
	randomImgs.incorrectAnswer = document.getElementById('incorrectAnswer');
};

randomImgs.loadData = function(){
	$.getJSON('database/random_images.json', function(data){		
	}).done(function(data){		
		randomImgs.globalData=data.page;
		randomImgs.globalCnt=0;
		randomImgs.buildDummyArray();
		randomImgs.showData();
		randomImgs.addEvents();	
	});
}

randomImgs.addEvents = function(){
	$(".option").click(function(){
		if($(this).attr('data-disabled')!="disabled"){
			if($(this).hasClass("correct")){
				randomImgs.incorrectAnswer.pause();
				randomImgs.correctAnswer.currentTime = 0;
				randomImgs.correctAnswer.play();
				$(".option").attr("data-disabled","disabled");
				$(this).children('.img-circle').addClass("CorrectOpt");
				if(randomImgs.globalCnt==randomImgs.globalData.length-1){
					alert('Congratulations!!! You have successfully completed the Assignment');
				}else{
				$("#btn-next").removeAttr("disabled");
				}
			}
			else{
				randomImgs.correctAnswer.pause();
				randomImgs.incorrectAnswer.currentTime = 0;
				randomImgs.incorrectAnswer.play();
				$(this).attr("data-disabled","disabled");
				$(this).children('.img-circle').addClass("WrongOpt");
			}
		}
	});
	
	$("#btn-next").click(function(){
		randomImgs.resetOptions();
		randomImgs.globalCnt++;
		randomImgs.showData();
	});
};

randomImgs.showData = function(){
	var cnt = randomImgs.randomValueGenerator();
	$("#imageTab").attr("src" , randomImgs.globalData[cnt].imagePath);	
	$("#option1 h4 img").attr("src" , randomImgs.globalData[cnt].Opt1);
	$("#option2 h4 img").attr("src" , randomImgs.globalData[cnt].Opt2);
	$("#option3 h4 img").attr("src" , randomImgs.globalData[cnt].Opt3);
	$("#option4 h4 img").attr("src" , randomImgs.globalData[cnt].Opt4);
	$("#option"+randomImgs.globalData[cnt].CorrectAns).addClass("correct");	
};

randomImgs.buildDummyArray = function(){
	for(var i=0;i<randomImgs.globalData.length;i++){
		randomImgs.globalArray.push(i);
	}
};

randomImgs.randomValueGenerator = function(){
	var index=Math.floor(Math.random() * randomImgs.globalArray.length);
	var randVal=randomImgs.globalArray[index];	
	randomImgs.globalArray.splice(index,1);
	return randVal;
}

randomImgs.resetOptions = function(){	
	randomImgs.incorrectAnswer.pause();
	randomImgs.correctAnswer.pause();
	$("#btn-next").attr("disabled","disabled");
	$(".img-circle").removeClass("WrongOpt");
	$(".img-circle").removeClass("CorrectOpt");
	$(".option").removeClass('correct');
	$(".option").removeAttr('data-disabled');
}