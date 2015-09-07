$(document).ready(function(){
	editController.init();
});

var editController = {}

editController.init = function(){
	editController.addEvents();
	editController.resetEditting();
	editController.editOn=false;
	editController.originalContent='';
};

editController.addEvents = function(){
	$(".editText").click(function(){
		if(editController.editOn!=true){
			editController.editContent(this);
		}
	});
	
	$('.textContent').on("keyup",function(){ 	// DOMSubtreeModified - Another event also possible, this checks content modification, not added because not tested on all browsers
		if($(this).hasClass("editOn")){			
			$(this).parent().children('.editedContent').val($(this).text());
		}
	});
	
	$('.cancelBtn').click(function(){
		editController.resetEditting(this);
	});
};

/** Called when Cancel button is Clicked */
editController.resetEditting = function(element){
	$(".wrapper").removeAttr('data-disabled','disabled');
	$(".editText").removeAttr('disabled','disabled');
	$(".submitBtn").hide();
	$(".cancelBtn").hide();
	$(".editText").removeAttr('disabled');
	$(".editText").show();
	editController.editOn=false;
	if(element){
		$(element).parent().children('.textContent').text(editController.originalContent);
		editController.originalContent='';
	}
};

/** Called when Edit button is Clicked */
editController.editContent = function(element){
	$(".wrapper").attr('data-disabled','disabled');
	$(".editText").attr('disabled','disabled');
	$(".editedContent").val('');
	$(element).parent().removeAttr('data-disabled');
	$(element).parent().children('.editText').removeAttr('disabled');
	$(element).hide();
	editController.originalContent=$(element).parent().children('.textContent').text();
	$(element).parent().children('.textContent').attr("contentEditable","true");
	$(element).parent().children('.textContent').addClass("editOn");
	$(element).parent().children('.submitBtn').show();
	$(element).parent().children('.cancelBtn').show();	
	editController.editOn=true;
};