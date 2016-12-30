angular.module("Qeen")
	.controller("SearchUserController", SearchUserController);

SearchUserController.$inject = ["UserService", "$rootScope"];

function SearchUserController(UserService, $rootScope){
	var vm = this;
	vm.userId = null;
	vm.searchedUsers = null;
	vm.noUserFound = false;
	vm.isLoading = false;
	vm.init = init;
	vm.searchOnKeyPress = searchOnKeyPress;
	vm.getPrimaryUsers = getPrimaryUsers;

	function init(){
		if(sessionStorage.getItem("userdets")){
			vm.userId = $rootScope.userdets.userId;
			if($rootScope.userdets.userId == undefined){
				vm.init();
				return;
			}
			else{
				vm.getPrimaryUsers();
			}
		}
	}

	function searchOnKeyPress(){
		if(vm.searchUsr.length >= 2){
			vm.isLoading= true;
			vm.noUserFound = false;
			UserService.searchUser(vm.searchUsr, vm.userId)
				.then(function(response){
					vm.searchedUsers = response;
					vm.isLoading = false;
					if(vm.searchedUsers.length == 0){
						vm.noUserFound = true;
					}
				})
				.catch(function(error){
					console.log(error);
				});
		}
		if(vm.searchUsr == null || vm.searchUsr == undefined || vm.searchUsr == "")
		{
			vm.searchedUsers = null;
			vm.noUserFound = false;
		}
	}

	function getPrimaryUsers(){
		UserService.getPrimaryUsers(vm.userId)
			.then(function(response){
				vm.searchedUsers = response;
			})
			.catch(function(error){
				console.log(error);
			});
	}
	vm.init();
}