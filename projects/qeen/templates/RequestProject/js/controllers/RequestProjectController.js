angular.module("Qeen")
	.controller("RequestProjectController", RequestProjectController);

RequestProjectController.$inject = ["ProjectsService", "$location", "$rootScope", "$timeout"];

function RequestProjectController(ProjectsService, $location, $rootScope, $timeout){
	var vm = this;
	vm.userId = null;
	vm.showError = false;
	vm.projects = null;
	vm.init = init;
	vm.checkPrjAvail = checkPrjAvail;
	vm.requestProject = requestProject;

	function init(){
		if(!sessionStorage.getItem("userdets")){
			$location.path('/sign-in');
		}
		else{
			vm.userId = $rootScope.userdets.userId;
			vm.projects = null;
		}
	}

	function checkPrjAvail(event){
		vm.showError = false;
		if(vm.prjName.length>2){
			ProjectsService.searchProject(vm.userId, vm.prjName)
				.then(function(response){
					vm.projects = response;
					if(vm.projects.length == 0){
						vm.showError = true;
						vm.projects = null;
					}
				})
				.catch(function(error){
					vm.showError = true;
					console.log(error);
				})
		}
	}

	function requestProject(prj){
		ProjectsService.checkPrjRequest(prj, vm.userId)
		.then(function(response) {
			if(response.length>0)
			{
				$rootScope.errorMessage="Request already exists for this project.";
				$timeout(function() {
					$rootScope.errorMessage = null;
				},2500);
			}
			else{
				var dt=new Date();
				ProjectsService.requestProject(prj, vm.userId, dt.getTime())
					.then(function(response){
						vm.prjName = null;
						vm.init();
					})
					.catch(function(error){
						console.log(error);
					});
			}
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	vm.init();
}