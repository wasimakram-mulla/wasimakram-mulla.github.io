var dt=new Date;
var sec=360;
var Minute=360;
var hr=360;

$(document).ready(function(){
	var tmpSec=dt.getSeconds();
	var tmpval=tmpSec*6;
	sec=sec+tmpval;
	
	var tmphr=dt.getHours();
	var tmphrVal=tmphr*30;
	hr=hr+tmphrVal;
	
	var tmpmin=dt.getMinutes();
	var tmpMinval=tmpmin*6;
	Minute=Minute+tmpMinval;
	
	RotateMinHand();
	RotateHourHand();
	fetchTime();
});

function RotateMinHand(){
/* Minute Hand */
	$(".needle2").css('transform','rotate('+Minute+'deg)');
	setTimeout(function(){
		Minute=Minute+6;
		RotateMinHand();
	},36000);
}

function RotateHourHand(){
/* Hour Hand */
	$(".needle1").css('transform','rotate('+hr+'deg)');
	setTimeout(function(){
		hr=hr+30;
		RotateHourHand();
	},2160000);
}

function fetchTime(){
	
	
	/* Second Hand */
	//console.log("Secs: " +sec);
	if(sec>=720)
	{
		sec=360;
	}
	sec=sec+6;
	$(".needle").css('transform','rotate('+sec+'deg)');
	setTimeout(function(){
		fetchTime();
	},1000);
}