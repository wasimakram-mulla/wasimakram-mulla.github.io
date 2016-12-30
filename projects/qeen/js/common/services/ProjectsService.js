angular.module("Qeen")
	.service("ProjectsService", ProjectsService);

ProjectsService.$inject = ["$http", "Backand", "$q", "$rootScope", "$timeout"];

function ProjectsService($http, Backand, $q, $rootScope, $timeout){
	var vm = this;
	vm.getUsersPrjs = getUsersPrjs;
	vm.getPrjUsrAdminCnt = getPrjUsrAdminCnt;
	vm.getProjectUsers = getProjectUsers;
	vm.checkIfPrjAdmin = checkIfPrjAdmin;
	vm.addUserToProj = addUserToProj;
	vm.removeUserFromProj = removeUserFromProj;
	vm.checkProjAvailByNm = checkProjAvailByNm;
	vm.createNewProject = createNewProject;
	vm.removeQueFromProj = removeQueFromProj;
	vm.deactivateProject = deactivateProject;
	vm.chngProjectAdmin = chngProjectAdmin;
	vm.searchProject = searchProject;
	vm.requestProject = requestProject;
	vm.checkPrjRequest = checkPrjRequest;
	vm.getPendingProjects = getPendingProjects
	vm.userProjectRequests = userProjectRequests;
	vm.approveProjectRequests = approveProjectRequests;
	vm.declineProjectRequests = declineProjectRequests;

	function getUsersPrjs(UserId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$rootScope.loadMessage = "loading projects.";
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/user_projects',
			    params: {
					parameters: {
						usrId: UserId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			});//$http finish
		});//$q finish
	};

	function getPendingProjects(usrId) {
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/get_pending_prjs',
			    params: {
					parameters: {
						prjAdminId: usrId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
				$rootScope.loader = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};

	function approveProjectRequests(prjDets) {
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/approve_prj_req',
			    params: {
					parameters: {
						prjId: prjDets.projId,
						usrId: prjDets.userId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage = "Project request accepted";
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};

	function declineProjectRequests(prjDets) {
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/decline_prj_req',
			    params: {
					parameters: {
						prjId: prjDets.projId,
						usrId: prjDets.userId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage = "Project request declined";
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};

	function userProjectRequests(UserId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/user_proj_req',
			    params: {
					parameters: {
						usrId: UserId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
				$rootScope.loader = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};
	
	function checkPrjRequest(prjDets, usrId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/check_prjreq_avail',
			    params: {
					parameters: {
						prjId: prjDets.projId,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
				$rootScope.loader = null;
			}, function errorCallback(err) {
				$rootScope.errorMessage = "Something went wrong, please try again later";
				$timeout(function() {
					$rootScope.errorMessage = null;
				},2000);
				reject(err);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};
	

	function requestProject(prjDets, usrId, timeStamp){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/add_proj_req',
			    params: {
					parameters: {
						prjId: prjDets.projId,
						prjAdminId: prjDets.projAdmin,
						usrId: usrId,
						timeStamp: timeStamp
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage = "Request added successfully";
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.loader = null;
				$rootScope.errorMessage = "Something went wrong, please try again later";
				$timeout(function() {
					$rootScope.errorMessage = null;
				},2000);
				reject(err);
			});//$http finish
		});//$q finish
	};
	
	function searchProject(usrId, prjTxt){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/search_project',
			    params: {
					parameters: {
						prjNm: prjTxt,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {				
				resolve(response.data);
				$rootScope.loader = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};
	
	function deactivateProject(prjId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/deactivate_project',
			    params: {
					parameters: {
						prjId: prjId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage = "Project deactivated permanently";
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.loader = null;
				$rootScope.errorMessage = "Something went wrong, please try again later.";
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject(err);
			});//$http finish
		});//$q finish
	};
	
	function chngProjectAdmin(prjId, usrId, adminId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/change_prj_admin',
			    params: {
					parameters: {
						prjId: prjId,
						usrId: usrId,
						newAdminId: adminId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage = "Admin changed successfully.";
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.loader = null;
				$rootScope.errorMessage = "Something went wrong, please try again later.";
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject(err);
			});//$http finish
		});//$q finish
	};

	function getProjectUsers(prjId, usrId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$rootScope.loadMessage = "loading Users.";
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/project_users',
			    params: {
					parameters: {
						prjId: prjId,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			});//$http finish
		});//$q finish
	};

	function getPrjUsrAdminCnt(usrId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$rootScope.loadMessage = "loading projects.";
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/proj_usr_count',
			    params: {
					parameters: {
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			});//$http finish
		});//$q finish
	};

	function checkIfPrjAdmin(prjId, usrId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/check_userprj_admin',
			    params: {
					parameters: {
						prjId: prjId,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				if(response.data.length>0){
					resolve(response.data);
				}
				else{
					reject("No data found");
				}
				$rootScope.loader = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};

	function addUserToProj(prjId, usrId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/add_proj_user',
			    params: {
					parameters: {
						prjId: prjId,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage="User added to project successfully."
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.errorMessage="Something went wrong, please try again."
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject(err);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};

	function removeUserFromProj(prjId, usrId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/delete_proj_user',
			    params: {
					parameters: {
						prjId: prjId,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage="User removed successfully."
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.errorMessage="Something went wrong, please try again."
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject(err);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};

	function removeQueFromProj(queId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$rootScope.loadMessage = "Remove relevant Projects";
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/delete_proj_ques',
			    params: {
					parameters: {
						queId: queId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
				reject(err);
			});//$http finish
		});//$q finish
	};

	function checkProjAvailByNm(prjNm){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/check_proj_avail',
			    params: {
					parameters: {
						prjNm: prjNm
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				if(response.data.length>0){
					resolve(response.data);
				}
				else{
					reject("Project already present");
				}
			}, function errorCallback(err) {
				$rootScope.loader = null;
				reject(err);
			});//$http finish
		});//$q finish
	};

	function createNewProject(usrId, prjNm){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/add_project',
			    params: {
					parameters: {
						usrId: usrId,
						prjNm: prjNm
					}
				}
			}).then(function successCallback(response) {
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/add_proj_user_postAddPrj',
					params: {
						parameters: {
							usrId: usrId
						}
					}
				}).then(function successCallback(responsePrj) {
					$rootScope.loader = null;
					$rootScope.successMessage="Project created successfully."
					$timeout(function(){
						$rootScope.successMessage = null;
						resolve(response.data);
					},1500);
				}, function errorCallback(errPrj) {
					$rootScope.loader = null;
					reject(errPrj);
				});//$http finish
			}, function errorCallback(err) {
				$rootScope.loader = null;
				reject(err);
			});//$http finish
		});//$q finish
	};
};