$(document).ready(function(){
	shell.init();
});

var shell = {};

shell.init = function(){
	shell.loadFirstPage();
	shell.addEvents();
	shell.objectName = new Object;
};

shell.loadFirstPage = function(){
	var firstTemplateLoad = $('a[data-template][data-activeTab="active"]').attr('data-template');
	$('#PageLoadContainer').load('template/' + firstTemplateLoad + '.html');
	firstTemplateLoad=null;
};

shell.addEvents = function(){
	$('a[data-template]').click(function(){
		if($(this).attr('data-jsonpage')!="" && $(this).attr('data-jsonpage')!=undefined){
			if(!$(this).parent().hasClass('active')){
				if($(this).attr('data-template')!=$('a[data-template][data-activeTab]').attr('data-template')){
					$('#PageLoadContainer').load('template/' + $(this).attr('data-template') + '.html');
					$('a[data-template]').parent().removeClass('active');		
					$('a[data-template]').removeAttr('data-activeTab');		
					$(this).parent().addClass('active');
					$(this).attr('data-activeTab','active');
				}
				else{										
					$('a[data-template]').parent().removeClass('active');		
					$('a[data-template]').removeAttr('data-activeTab');		
					$(this).parent().addClass('active');
					$(this).attr('data-activeTab','active');
					shell.objectName.init();
				}
			}
		}
		else{
			alert('Missing File Name to be loaded');
		}	
	});
};