$(document).ready(function(){
	framework.init();
});

var framework={};

framework.init = function(){
	framework.addEvents();	
}

framework.addEvents = function(){
	var tmpImg="";
	$(".galPic img").bind("mouseenter", function(){
		tmpImg = $(this).attr('src');
		$(this).attr("src", $(this).attr('data-origImg'));
	});
	
	$(".galPic img").bind("mouseleave", function(){		
		$(this).attr("src", tmpImg);
	});
};