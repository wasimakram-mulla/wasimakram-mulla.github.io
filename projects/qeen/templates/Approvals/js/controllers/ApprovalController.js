angular.module("Qeen")
	.controller("ApprovalController", ApprovalController);

ApprovalController.$inject = ["ProjectsService", "$location", "$rootScope"];

function ApprovalController(ProjectsService, $location, $rootScope){
	var vm = this;
    vm.activeTab = null;
    vm.projects = null;
    vm.myReqs = null;
    vm.init = init;
    vm.setActiveTab = setActiveTab;
    vm.getPendingApprovals = getPendingApprovals;
    vm.myRequests = myRequests;
    vm.approveProject = approveProject;
    vm.declineProject = declineProject;

	function init(){
		if(!sessionStorage.getItem("userdets")){
			$location.path('/sign-in');
		}
		else{
			vm.userId = $rootScope.userdets.userId;
            vm.activeTab = "pendingArroval";
            vm.projects = null;
            vm.myReqs = null;
            vm.getPendingApprovals();
		}
	}

    function setActiveTab(activeTab) {
        if(vm.activeTab != activeTab){
            vm.activeTab = activeTab;
            if(vm.activeTab == "pendingArroval"){
                vm.getPendingApprovals();
            }
            else{
                vm.myRequests();
            }
        }
    }

    function getPendingApprovals(){
        ProjectsService.getPendingProjects(vm.userId)
            .then(function(response) {
                vm.projects = response;
            })
            .catch(function(error){
                console.log(error);
            })
    }

    function myRequests(){
        ProjectsService.userProjectRequests(vm.userId)
            .then(function(response){
                vm.myReqs = response;
            })
            .catch(function(error){
                console.log(error);
            })
    }

    function approveProject(prjDets){
        ProjectsService.approveProjectRequests(prjDets)
            .then(function(response){
                vm.init();
            })
            .catch(function(error){
                console.log(error);
            });
    }

    function declineProject(prjDets){
        ProjectsService.declineProjectRequests(prjDets)
            .then(function(response){
                vm.init();
            })
            .catch(function(error){
                console.log(error);
            });
    }
    vm.init();
}