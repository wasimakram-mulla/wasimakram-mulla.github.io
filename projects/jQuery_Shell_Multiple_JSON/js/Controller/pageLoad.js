var pageLoad = {};

pageLoad.init = function(){
	var pageJson = $('a[data-template][data-activeTab="active"]');
	pageLoad.startLoadingJson(pageJson);
	pageLoad.globalData;
	pageJson=null;
};

pageLoad.startLoadingJson = function(element){	
	pageLoad.loadPage = $(element).attr('data-jsonpage');
	pageLoad.loadJSON(pageLoad.loadPage);
};

pageLoad.loadJSON = function(page){
	var dt = new Date();
	$.getJSON("database/"+page+".json?" + dt.getTime(), function(data){})
	.error(function(err){
		alert("Error");
	}).done(function(data){		
		pageLoad.globalData=data.page;
		console.log(pageLoad.globalData.length);
		pageLoad.setData();
	});
};

pageLoad.setData = function(){
	$("#loadDataContainer li").remove();
	for(var i=0;i<pageLoad.globalData.length;i++){
		$("#loadDataContainer").append("<li class='list-group-item'>"+pageLoad.globalData[i].imagePath+"</li>");
	}
}

$(document).ready(function(){
	pageLoad.init();
	shell.objectName = pageLoad;
});