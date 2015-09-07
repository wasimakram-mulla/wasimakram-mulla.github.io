$(document).ready(function(){
	mtf.init();
});

var mtf = {};

mtf.init = function(){
	$("#checkMTF").attr('disabled','disabled');
	$("#retryMTF").attr('disabled','disabled');
	mtf.clearFields();
	mtf.dragndrop();
	mtf.addEvents();
	mtf.tickElement = document.getElementById('tickClick');	
	mtf.clickElement = document.getElementById('ClickSound');	
	mtf.cnt=0;
}

mtf.dragndrop = function(){
	$(".words h4").draggable({ revert: true });
	$( ".fruits" ).droppable({
		accept: ".words h4",
		activeClass: "ui-state-hover",
		hoverClass: "ui-state-active",
		drop: function( event, ui ) {
			if($(this).children("input").val()==''){
				$(this).children("input").val(ui.draggable.context.innerHTML.toUpperCase());
				ui.draggable.hide();
				mtf.cnt++;
				if(mtf.cnt==$('.words').size()){
					$("#checkMTF").removeAttr('disabled');
					$("#retryMTF").removeAttr('disabled');
				}
			}
			//debugger;
			//console.log(ui);
		}
	});
}

mtf.clearFields = function(){
	$(".fruits input").val('');
};

mtf.addEvents = function(){
	$("#checkMTF").click(function(){
	var tmpCheck=true;
		$( ".fruits" ).each(function(){
			$(this).children("span").remove();
			if($(this).children('input').val()==$(this).attr("data-fruit").toUpperCase()){
				$(this).append('<span class="correct"></span>');
			}
			else{
				$(this).append('<span class="wrong"></span>');
				tmpCheck=false;
			}
		});
		if(tmpCheck){
			alert('Congo Buddy !!! You Have successfully completed the Test');
			$("#checkMTF").attr('disabled','disabled');
			$("#retryMTF").attr('disabled','disabled');
		}
		tmpCheck=null;
	});
	
	$("#retryMTF").click(function(){
		$( ".fruits" ).each(function(){
			if($(this).children('span').hasClass('wrong')){				
				$('.words[data-fruitname="'+$(this).attr("data-fruit").toUpperCase()+'"]').children().show();
				$(this).children('input').val('');
				$(this).children('span').remove();
			}
		});
	});
	
	$(".ui-draggable").on("mouseenter",function(){		
		mtf.tickElement.currentTime = 0;
		mtf.tickElement.play();
	});
	
	$(".ui-draggable").on("click",function(){		
		mtf.clickElement.currentTime = 0;
		mtf.clickElement.play();
	});
};