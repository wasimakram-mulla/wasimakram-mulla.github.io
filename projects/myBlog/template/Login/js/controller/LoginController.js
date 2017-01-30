angular.module("GitBlog")
	.controller("LoginController", LoginController);

LoginController.$inject = ["$firebaseObject", "$rootScope", "PopUp", "$location", "UserService"];

function LoginController($firebaseObject, $rootScope, PopUp, $location, UserService){
	var vm = this;
	vm.userData = null;
	vm.init = init;
	vm.checkLogin = checkLogin;
	
	function checkLogin(){
		console.log(vm.email, vm.passwd);
		if(vm.userData.username == vm.email && vm.userData.password == vm.passwd){
			PopUp.success("Login Successful");
			UserService.setUser();
			$location.path('addblog');
		}
		else{
			PopUp.error("Do I know you?");
		}
	};
	
	function init(){
		try{
			var rootRef = firebase.database().ref().child('/user-master');
			var ref = rootRef.child('/user');
			vm.userData = $firebaseObject(ref);
		}
		catch(ex){
			console.log(ex);
			PopUp.error("Not able to connect to server.");
		}
	};
	
	vm.init();
}