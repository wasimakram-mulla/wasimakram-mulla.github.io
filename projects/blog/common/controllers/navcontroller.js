angular.module('BlogApp').
	controller("NavController", NavController);

NavController.$inject = ['$rootScope', 'DataService', '$location'];

function NavController($rootScope, DataService, $location){
	var vm = this;
	vm.showLoginPopup = showLoginPopup;
	vm.logoutUser = logoutUser;
	$rootScope.showLoginModal= false;
	$rootScope.usersdetailsModal= false;

	function showLoginPopup(){
		$rootScope.showLoginModal= true;
	}
	function logoutUser(){
		DataService.setLoginUser(null, false);
		if($location.path() == '/newblog'){
			$location.path("/");
		}
	}
}