$(document).ready(function(){
	$(".project").bind("mouseenter", function(){
		$(this).children(".overlay").fadeIn();		
		$(this).children("a").children(".text-data").fadeIn();
	});
	
	$(".project").bind("mouseleave", function(){
		$(this).children("a").children(".text-data").hide();
		$(this).children(".overlay").fadeOut();		
	});
	
	$("#btn-close-popup").click(function(){
		$('.popContainer').hide();
	});
	
	$(".icon").click(function(){
		$(".popupHeader strong").html("Information"); //Reset Text
		$(".popupContent").html("Content"); //Reset Text
		$(".popupHeader strong").html($(this).parent().children('.project-header').html());
		$(".popupContent").html($(this).parent().children('.project-info').html());
		$('.popContainer').show();
	});
	
	$(document).keyup(function(e) {
	  if (e.keyCode == 27) { $('#btn-close-popup').click(); }   // esc
	});	
	
	$("#totProjects strong span").text($(".flip-container").size());
});