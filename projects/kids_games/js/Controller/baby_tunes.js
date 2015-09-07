$(document).ready(function(){
	baby_tunes.init();
});

var baby_tunes={};

baby_tunes.init = function(){
	baby_tunes.audioElement=document.getElementById("audioPlayer");
	baby_tunes.addEvents();
	baby_tunes.startAudio();
	baby_tunes.audioFlag=false;
};

baby_tunes.startAudio = function(){
	baby_tunes.audioElement.currentTime = 10;
	//baby_tunes.audioElement.volume=0.1;
	baby_tunes.audioElement.play();
	baby_tunes.audioFlag=true;
	$("#playBtn").removeClass('playBtn');
	$("#playBtn").addClass('pauseBtn');
}

baby_tunes.addEvents = function(){
	baby_tunes.audioElement.addEventListener("timeupdate", function() {
		//console.log(baby_tunes.audioElement.currentTime);
		if(baby_tunes.audioElement.currentTime>=10 && baby_tunes.audioElement.currentTime<15){
			$("#audioText h3").text("She is a Kid.");
			$("#girlCnt").css("background-position","0px -215px");
		}
		else if(baby_tunes.audioElement.currentTime>=15 && baby_tunes.audioElement.currentTime<20){
			baby_tunes.resetItems();
			$("#audioText h3").text("He has a tin.");
		}
		else if(baby_tunes.audioElement.currentTime>=20 && baby_tunes.audioElement.currentTime<30){
			baby_tunes.resetItems();
			$("#audioText h3").text("Song Paused.");
				baby_tunes.audioElement.pause();
		}
	}, false);
	
	$("#playBtn").click(function(){
		if(baby_tunes.audioFlag){
			baby_tunes.audioFlag=false;
			$(this).removeClass('playBtn');
			$(this).addClass('pauseBtn');			
			baby_tunes.audioElement.play();
		}
		else{
			baby_tunes.audioFlag=true;
			$(this).removeClass('pauseBtn');
			$(this).addClass('playBtn');	
			baby_tunes.audioElement.pause();					
		}
	});
	
	$("#stopBtn").click(function(){
		baby_tunes.audioElement.currentTime=10;
		baby_tunes.audioElement.pause();
		$("#playBtn").removeClass('pauseBtn');
		$("#playBtn").addClass('playBtn');
		baby_tunes.audioFlag=true;
	});
};

/** This will reset all Items to normal state */
baby_tunes.resetItems = function(){
	$("#girlCnt").css("background-position","0px 0px")
}