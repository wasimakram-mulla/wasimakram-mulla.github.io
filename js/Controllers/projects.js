$(document).ready(function(){
	setTimeout(function(){
		$("#btn-close-popup").click(function(){
			$('.popContainer').hide();
		});
		
		$(".icon").click(function(){
			$(".popupHeader strong").html("Information"); //Reset Text
			$(".popupContent").html("Content"); //Reset Text
			$(".popupHeader strong").html($(this).parent().children("a").find('.text-data').children("h3").html());
			$(".popupContent").html($(this).parent().children("a").find('.text-data').children("h4").html());
			$('.popContainer').show();
		});
		
		$(document).keyup(function(e) {
		  if (e.keyCode == 27) { $('#btn-close-popup').click(); }   // esc
		});	
	},1500);
	//$("#totProjects strong span").text($(".flip-container").size());
});