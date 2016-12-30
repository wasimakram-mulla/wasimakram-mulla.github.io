angular.module("Qeen")
	.controller("TeamController", TeamController);

TeamController.$inject = ["ProjectsService", "UserService", "$rootScope", "$timeout", "$location"];

function TeamController(ProjectsService, UserService, $rootScope, $timeout, $location){
	var vm = this;
	vm.userprojects = null;
	vm.prjUsers = null;
	vm.selectedPrj = null;
	vm.searchedUsers = null;
	vm.usrIdAdmin = false;
	vm.isLoading = false;
	vm.noUserFound = false;
	vm.selectedPrjTab = 1;
	vm.init = init;
	vm.selectProject = selectProject;
	vm.searchOnKeyPress = searchOnKeyPress;
	vm.getSelectedPrjUsers = getSelectedPrjUsers;
	vm.addUserToProject = addUserToProject;
	vm.removeUserFromProject = removeUserFromProject;

	function init(){
		if(sessionStorage.getItem("userdets")){
			vm.userId = $rootScope.userdets.userId;
			ProjectsService.getUsersPrjs(vm.userId)
			.then(function(response){
				vm.userprojects = response;
				vm.selectedPrj = vm.userprojects[1];
				vm.getSelectedPrjUsers();
			})
			.catch(function(error){
				console.log(error)
			});
		}
		else{
			$location.path('/');
		}
	}

	function getSelectedPrjUsers(){
		vm.usrIdAdmin = false;
		ProjectsService.getProjectUsers(vm.selectedPrj.projId, vm.userId)
			.then(function(response){
				vm.prjUsers = response;
				ProjectsService.checkIfPrjAdmin(vm.selectedPrj.projId, vm.userId)
					.then(function(responseAdmin){
						vm.usrIdAdmin = true;
					})
					.catch(function(errorAdmin){
						vm.usrIdAdmin = false;
					});
			})
			.catch(function(error){
				console.log(error);
			});
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

	function selectProject(prj, index){
		vm.selectedPrj = prj;
		vm.selectedPrjTab = index;
		vm.getSelectedPrjUsers();
	}

	function removeUserFromProject(usrDets){
		ProjectsService.removeUserFromProj(vm.selectedPrj.projId, usrDets.userId)
			.then(function(response){
				vm.searchUsr = null;
				vm.searchedUsers = null;
				vm.noUserFound = false;
				vm.getSelectedPrjUsers();
			})
			.catch(function(error){
				console.log(error)
			});
	}

	function addUserToProject(usrDets){
		var userFlag = false;
		for(var i=0;i<vm.prjUsers.length;i++){
			if(usrDets.userId == vm.prjUsers[i].userId){
				userFlag = true;
				break;
			}
		}
		if(userFlag == true){
			$rootScope.errorMessage = "User already in project."
			$timeout(function(){
				$rootScope.errorMessage = null;
			},2000);
		}
		else{
			ProjectsService.addUserToProj(vm.selectedPrj.projId, usrDets.userId)
				.then(function(response){
					vm.searchUsr = null;
					vm.searchedUsers = null;
					vm.noUserFound = false;
					vm.getSelectedPrjUsers();
				})
				.catch(function(error){
					console.log(error)
				});
		}
	}
	vm.init();
}