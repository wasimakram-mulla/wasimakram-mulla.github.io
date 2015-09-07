mycart.controller("dataload", function($scope, $http, $templateCache, $location){
	$scope.cartData = new Array();
	$scope.totAmnt=0;
	if(sessionStorage.cartData)
	{
		$scope.cartData=JSON.parse(sessionStorage.cartData);
		for(var i=0;i<$scope.cartData.length;i++)
		{
			$scope.totAmnt=$scope.totAmnt + $scope.cartData[i].price;
		}
	}
	$scope.mainData = new Array();
	$http({
		method: 'POST',
		url: 'data/mobileData.json',
		}).
		error(function(data, status, headers, config) {
			alert('Service Error');
		}).then(function(result){			
			$scope.mainData=result.data.mobileData;
	});
	
	$scope.filterData = function(){
		//console.log('rangeValMin: '+ $scope.rangeValMin + " rangeValMax: "+ $scope.rangeValMax);
		$http({
		method: 'POST',
		url: 'data/mobileData.json',
		}).
		error(function(data, status, headers, config) {
				alert('Service Error');
			}).then(function(result){				
				$scope.mainData=result.data.mobileData;
				for(var i=0; i<$scope.mainData.length;i++){
					if(parseInt($scope.mainData[i].price)>=$scope.rangeValMin && parseInt($scope.mainData[i].price)<=$scope.rangeValMax)
					{
						
					}
					else{
						$scope.mainData.splice(i,1);
						i--;
					}
				}
		});		
	};
	
	$scope.addtoCart = function(addData){
		var alreadyAddedFlag=false;
		for(var i=0;i<$scope.cartData.length;i++){
			if(addData.id==$scope.cartData[i].id){
				alreadyAddedFlag=true;
				console.log('Already Added Found: ' + $scope.cartData[i].productName);
				break;
			}
		}
		if(alreadyAddedFlag==false){
			$scope.cartData.push(addData);
			$scope.totAmnt=$scope.totAmnt+addData.price;
			sessionStorage.cartData=JSON.stringify($scope.cartData);
		}
	};
	$scope.routePage = function(datapath){
		$location.path('details/'+datapath);
	};
	
	$scope.emptySession = function(){
		sessionStorage.removeItem("cartData");
		$scope.cartData=[];
		$scope.totAmnt=0;
	};
	
	$scope.removeItemFromCart = function(remData){
		for(var i=0;i<$scope.cartData.length;i++){
			if(remData.id==$scope.cartData[i].id){
				$scope.totAmnt=$scope.totAmnt-$scope.cartData[i].price;
				$scope.cartData.splice(i,1);
				sessionStorage.cartData=JSON.stringify($scope.cartData);
				break;
			}
		}
	};
	
});

mycart.controller("mobileDetails", function($scope, $http, $templateCache, $location, $routeParams){
	//alert($routeParams.param);	
	$scope.cellDetails= new Array();
	$http({
		method: 'POST',
		url: 'data/'+$routeParams.param+'.json',
		}).
		error(function(data, status, headers, config) {			
		}).then(function(result){
			console.log(result.data.mobileDetails);
			$scope.cellDetails=result.data.mobileDetails;
			$scope.dispImage=$scope.cellDetails[0].imgs[0];
	});
	
	$scope.changeDispImage = function(img){
		$scope.dispImage=img;
	}
});
