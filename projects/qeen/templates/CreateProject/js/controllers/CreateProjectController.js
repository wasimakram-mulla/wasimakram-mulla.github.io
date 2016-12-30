angular.module("Qeen")
	.controller("CreateProjectController", CreateProjectController);

CreateProjectController.$inject = ["ProjectsService", "$location", "$rootScope", "$timeout"];

function CreateProjectController(ProjectsService, $location, $rootScope, $timeout){
	var vm = this;
	vm.userId = null;
	vm.projectNmAvail = false;
	vm.showError = false;
	vm.init = init;
	vm.checkPrjAvail = checkPrjAvail;
	vm.modifyPrjNm = modifyPrjNm;
	vm.createNewProject = createNewProject;

	function init(){
		if(!sessionStorage.getItem("userdets")){
			$location.path('/sign-in');
		}
		else{
			vm.userId = $rootScope.userdets.userId;
		}
	}

	function checkPrjAvail(){
		if(vm.prjName!=null && vm.prjName!=undefined && vm.prjName!=""){
			ProjectsService.checkProjAvailByNm(vm.prjName)
				.then(function(response){
					vm.projectNmAvail = false;
					vm.showError = true;
				})
				.catch(function(error){
					console.log(error);
					vm.projectNmAvail = true;
					vm.showError = true;
				});
		}
	}

	function modifyPrjNm(event){
		vm.projectNmAvail = false;
		vm.showError = false;
		if(event.keyCode==13){
			vm.checkPrjAvail();
		}
	}

	function createNewProject(){
		ProjectsService.createNewProject(vm.userId, vm.prjName)
			.then(function(response){
				$rootScope.successMessage = "Please add some team members to this project. Redirecting you..."
				$timeout(function(){
					$rootScope.successMessage = null;
					$location.path('/teams');
				},2000);
			})
			.catch(function(error){});
	}
	vm.init();
}