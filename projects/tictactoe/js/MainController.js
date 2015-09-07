$(document).ready(function(){
	game.init();
});

var playercheck=0;
var game={

}

game.init = function(){
	playercheck=Math.round(Math.random(1,2));
	game.checkPlayer(playercheck);
	game.eventBindings();
}

game.checkPlayer= function(playercheck){
	if(!playercheck){
		$('.heading').html("Player 1's turn");
	}
	else{
		$('.heading').html("Player 2's turn");
	}
}

game.eventBindings= function(){
	$('.clkevt').bind('click', function(){
		if(!$(this).hasClass("disabled"))
		{
			game.checkSign(this,playercheck);
			if(!playercheck){
				game.status('Player 1 ', 'cross');
			}
			else{
				game.status('Player 2 ', 'circle');
			}
			game.changePlayer();
			$(this).addClass("disabled")
		}
	});
	
	$('.resetGame').bind('click', function(){
		game.resetGame();
	});
}

game.checkSign= function(element,playercheck){
	//console.log(playercheck);
	if(!playercheck)
	{
		$(element).addClass('cross');
		$(element).removeClass("clkevt");
	}
	else{
		$(element).addClass('circle');
		$(element).removeClass("clkevt");
	}
}

game.changePlayer= function(){
	playercheck=!playercheck;
	game.checkPlayer(playercheck);
}

game.status= function(playername, sign){
	if($(".c1").hasClass(sign) && $(".c2").hasClass(sign) && $(".c3").hasClass(sign)){
		alert(playername + 'Won');
		$(".col").addClass("disabled");
	}
	else if($(".c1").hasClass(sign) && $(".c4").hasClass(sign) && $(".c7").hasClass(sign)){
		alert(playername + 'Won');
		$(".col").addClass("disabled");
	}
	else if($(".c1").hasClass(sign) && $(".c5").hasClass(sign) && $(".c9").hasClass(sign)){
		alert(playername + 'Won');
		$(".col").addClass("disabled");
	}
	else if($(".c3").hasClass(sign) && $(".c6").hasClass(sign) && $(".c9").hasClass(sign)){
		alert(playername + 'Won');
		$(".col").addClass("disabled");
	}
	else if($(".c3").hasClass(sign) && $(".c5").hasClass(sign) && $(".c7").hasClass(sign)){
		alert(playername + 'Won');
		$(".col").addClass("disabled");
	}
	else if($(".c9").hasClass(sign) && $(".c8").hasClass(sign) && $(".c7").hasClass(sign)){
		alert(playername + 'Won');
		$(".col").addClass("disabled");
	}
	else if($(".c4").hasClass(sign) && $(".c5").hasClass(sign) && $(".c6").hasClass(sign)){
		alert(playername + 'Won');
		$(".col").addClass("disabled");
	}
	else if($(".c2").hasClass(sign) && $(".c5").hasClass(sign) && $(".c8").hasClass(sign)){
		alert(playername + 'Won');
		$(".col").addClass("disabled");
	}
}

game.resetGame= function(){
	$(".col").removeClass("disabled");
	$(".col").removeClass("clkevt");	
	$(".clkevt").unbind("click");	
	$(".col").removeClass("circle");	
	$(".col").removeClass("cross");	
	game.init();
}