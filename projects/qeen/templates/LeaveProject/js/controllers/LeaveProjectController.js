angular.module("Qeen")
	.controller("LeaveProjectController", LeaveProjectController);

LeaveProjectController.$inject = ["ProjectsService", "$rootScope"];

function LeaveProjectController(ProjectsService, $rootScope){
	var vm = this;
	vm.userprojects = null;
	vm.leaveCode = null;
	vm.leaveProjectFlag = false;
	vm.selectedPrj = null;
	vm.init = init;
	vm.leaveProject = leaveProject;
	vm.removeProject = removeProject;
	vm.closeDelPopup = closeDelPopup;

	function init(){
		if(sessionStorage.getItem("userdets")){
			vm.userId = $rootScope.userdets.userId;
			if($rootScope.userdets.userId == undefined){
				vm.init();
				return;
			}
			ProjectsService.getPrjUsrAdminCnt(vm.userId)
			.then(function(response){
				vm.userprojects = response;
			})
			.catch(function(error){
				console.log(error)
			});
		}
		else{
			$location.path('/sign-in');
		}
	}

	function leaveProject(prjDets){
		vm.leaveProjectFlag = true;
		vm.selectedPrj = prjDets;
		if(prjDets.users <= 1){
			vm.leaveCode = "deactivate";
		}
		else if(prjDets.projAdmin == vm.userId){
			vm.leaveCode = "chngadmin";
		}
		else{
			vm.leaveCode = "leave";
		}
	}

	function removeProject(){
		if(vm.leaveCode == "deactivate"){
			ProjectsService.deactivateProject(vm.selectedPrj.projId)
				.then(function(response){
					vm.closeDelPopup();
					vm.init();
				})
				.catch(function(error){
					console.log(error)
				});
			//if users <= 1 -> del prj and questions
		}
		else if(vm.leaveCode == "chngadmin"){
			ProjectsService.getProjectUsers(vm.selectedPrj.projId, vm.userId)
				.then(function(response){
					ProjectsService.chngProjectAdmin(vm.selectedPrj.projId, vm.userId, response[0].userId)
						.then(function(responseChngAdmin){
							vm.closeDelPopup();
							vm.init();
						})
						.catch(function(errorChng){
							console.log(errorChng)
						});
				})
				.catch(function(error){
					console.log(error)
				});
			//else if project admin is user -> change Admin
		}
		else{
			ProjectsService.removeUserFromProj(vm.selectedPrj.projId, vm.userId)
				.then(function(response){
					vm.closeDelPopup();
					vm.init();
				})
				.catch(function(error){
					console.log(error)
				});
			//else -> leave project
		}
	}

	function closeDelPopup(){
		vm.leaveProjectFlag = false;
		vm.leaveCode = null;
		vm.selectedPrj = null;
	}
	vm.init();
}