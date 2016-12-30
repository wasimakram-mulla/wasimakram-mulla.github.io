angular.module("Qeen")
	.controller("NavigationController", NavigationController);

NavigationController.$inject = ["$http", "$timeout", "$location", "$rootScope", "UserService"];

function NavigationController($http, $timeout, $location, $rootScope, UserService){
	var vm = this;
	vm.init = init;
	vm.logout = logout;

	function init(){
		if(sessionStorage.getItem("userdets")){
			$rootScope.userdets = JSON.parse(sessionStorage.getItem("userdets"));
			$rootScope.userAvatar = null;
			UserService.getUserDetails($rootScope.userdets.userId)
				.then(function(response){					
				})
				.catch(function(error){
					console.log(error)
				});
		}
	}

	function logout(){
		$rootScope.loader = true;
		$timeout(function(){
			sessionStorage.removeItem("userdets");
			$rootScope.userdets = null;
			$rootScope.loader = null;
			$rootScope.userAvatar = null;
			$rootScope.previousPath = null;
			$location.path('/');
		},500);
	}

	vm.init();
}