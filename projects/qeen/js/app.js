angular.module("Qeen", ["ngRoute", "ngAnimate", "ngSanitize", "backand"])
	.run(["$rootScope", function($rootScope){
		$rootScope.userdets = JSON.parse(sessionStorage.getItem("userdets"));
		if($rootScope.userdets!=null || $rootScope.userdets!=undefined)
		{
			$rootScope.userAvatar = $rootScope.userdets.userAvatar;
		}
	}]);