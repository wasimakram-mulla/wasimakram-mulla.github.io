/* 
Last Version: 1.0

Create a separate object for all the sub list items clicked and also validate it.
then after pushing the items in the Object set a Timout for draggable one and repeat the objects with the help of Angular.
*/

CoreStructure.controller("WallObjectsController", function($scope, $http, $templateCache){
	var mainScope=this;
	mainScope.innerContentShow=false;
	mainScope.globalObjects = new Array();
	mainScope.dupGlobalObjects = new Array();
	mainScope.wallObjects = new Array();
	
	$http({
		method: 'POST',
		url: 'db/objects.json',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		cache: $templateCache
		}).
		success(function(data, status, headers, config) {
			
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).
		then(function(result){
			mainScope.globalObjects=result.data.wall;
			mainScope.dupGlobalObjects = mainScope.globalObjects;
			//console.log(mainScope.globalObjects);
		});
		
	mainScope.selObject = function(clickedObj){		
		mainScope.innerContentShow=true;
		mainScope.dupGlobalObjects=new Array();
		mainScope.dupGlobalObjects.push(clickedObj);
		//console.log(mainScope.globalObjects);
		/* setTimeout(function(){
			console.log('subdrag');
			$(".objects img").draggable({containment: ".wall"});				
		},500); */
	}
	
	mainScope.jumpBack = function(){		
		if(mainScope.innerContentShow){
			mainScope.innerContentShow=false;
		}
		else{
			mainScope.innerContentShow=true;
		}		
	}
		
	mainScope.pushObjOnWall = function(pushedObj, subItms){
		var flag=false;
		var tmpIndex=0;
		for(var i=0;i< mainScope.wallObjects.length; i++){			
			if(pushedObj.objNm == mainScope.wallObjects[i].ObjectType){
				flag=true;
				tmpIndex=i;
				break;
			}
		}
		if(flag==false){
			var tmpObj={
				"ObjectType":pushedObj.objNm,
				"imagePath":subItms
			}
			mainScope.wallObjects.push(tmpObj);
			//console.log(mainScope.wallObjects);
		}
		else{
			mainScope.wallObjects[tmpIndex].imagePath=subItms;
		}
		console.log(mainScope.wallObjects);
		setTimeout(function(){
			$(".dragObjs").draggable({containment: ".wall"});				
		},500);
	}
	
});


CoreStructure.controller("tilesController", function($scope, $http, $templateCache){
	var mainScope=this;
	mainScope.sidebarOpen = false;
	mainScope.tiles= new Array();
	
	$http({
	method: 'POST',
	url: 'db/colors.json',
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	cache: $templateCache
	}).
	success(function(data, status, headers, config) {
		
	}).
	error(function(data, status, headers, config) {
		alert('Service Error');
	}).
	then(function(result){
		mainScope.tiles=result.data.color;
		
	});
	
	mainScope.openCloseSideBar = function(){
		console.log(mainScope.sidebarOpen);
		if(mainScope.sidebarOpen){
			$('.tilesContainer').animate({
				"width":"0px"
			},500);
			$('.sideBar').removeClass('closeBar');
			$('.sideBar').addClass('openBar');
			mainScope.sidebarOpen=false;
		}else{
			$('.tilesContainer').animate({
				"width":"350px"
			},500);
			$('.sideBar').removeClass('openBar');
			$('.sideBar').addClass('closeBar');
			mainScope.sidebarOpen=true;
		}
	};
	
	mainScope.applyBg = function(bg){
		$('.wall').css('background',"url("+bg+")");
	};
});