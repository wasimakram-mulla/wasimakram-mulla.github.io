angular.module("Qeen")
	.service("UserService", UserService);

UserService.$inject = ["$http", "Backand", "$q", "$rootScope", "$timeout"];

function UserService($http, Backand, $q, $rootScope, $timeout){
	var vm = this;
	vm.getUsersWithId = getUsersWithId;
	vm.searchUser = searchUser;
	vm.checkLogin = checkLogin;
	vm.getUserPass = getUserPass;
	vm.changePassword = changePassword;
	vm.getUserDetails = getUserDetails;
	vm.getLocalAvatars = getLocalAvatars;
	vm.changeAvatar = changeAvatar;
	vm.getPrimaryUsers = getPrimaryUsers;
	vm.checkUserNameAvail = checkUserNameAvail;
	vm.createAccount = createAccount;
	vm.fetchSecurityQuestion = fetchSecurityQuestion;
	vm.fetchPassword = fetchPassword;

	function getUsersWithId(usrId){
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/objects/questions'
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	};

	function getPrimaryUsers(usrId){
		$rootScope.loader = true;
		$rootScope.loadMessage = "loading primitive users.";
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/primary_users',
				params: {
					parameters: {
						usrId: usrId
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

	function checkUserNameAvail(usrNm){
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/check_username',
				params: {
					parameters: {
						usrNm: usrNm
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	};

	function getUserPass(usrId, pass){
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/get_user_pass',
				params: {
					parameters: {
						usrId: usrId,
						passwd: pass
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	};

	function changeAvatar(usrId, avatar){
		$rootScope.loader = true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/change_avatar',
				params: {
					parameters: {
						usrId: usrId,
						avatar: avatar
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.errorMessage = "Something went wrong, please try again."
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				$rootScope.loader = null;
				reject(err);
			});//$http finish
		});//$q finish
	};

	function createAccount(usrObj){
		$rootScope.loader = true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/create_account',
				params: {
					parameters: usrObj
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage = "Welcome "+response.data[0].userFullName+", to Qeen family."
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.errorMessage = "Something went wrong, please try again."
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				$rootScope.loader = null;
				reject(err);
			});//$http finish
		});//$q finish
	};

	function getUserDetails(usrId){
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/user_details',
				params: {
					parameters: {
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				if(response.data.length>0){
					if(response.data[0].userAvatar == null){
						$rootScope.userAvatar = null;
					}
					else{
						if($rootScope.userAvatar == null)
						{
							$rootScope.userAvatar = response.data[0].userAvatar;
						}
					}
					resolve(response.data[0]);
				}
				else{
					reject("User not found");
				}
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	};

	function changePassword(newpass, usrId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/change_pass',
				params: {
					parameters: {
						passwd: newpass,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.loader = null;
				reject(err);
			});//$http finish
		});//$q finish
	};

	function checkLogin(usernm, passwd){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
			method: 'POST',
			url: Backand.getApiUrl() + '/1/query/data/checklogin',
			params: {
				parameters: {
					unm: usernm,
					pwd: passwd
				}
			}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				if(response.data.length>0){
					$rootScope.successMessage="Login Successful";
					$timeout(function(){
						$rootScope.successMessage=null;
					},1000);
					vm.getUserDetails(response.data[0].userId);
					resolve(response.data[0]);
				}
				else{
					$rootScope.errorMessage="Invalid Username and Password";
					$timeout(function(){
						$rootScope.errorMessage=null;
					},2000);
					reject("cannot find user");
				}
			}, function errorCallback(err) {
				console.log(err)
				reject(err);
			});//$http finish
		});//$q finish
	}

	function searchUser(usrDets, usrId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/search_user',
				params: {
					parameters: {
						user: usrDets,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
				$rootScope.loader = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.errorMessage = "Something went wrong, please try again.";
				$timeout(function(){
					$rootScope.errorMessage
				},2000);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};

	function fetchSecurityQuestion(usrNm){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/fetch_securityDets',
				params: {
					parameters: {
						usrNm: usrNm
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				resolve(response.data[0]);
			}, function errorCallback(err) {
				reject(err);
				$rootScope.errorMessage = "Something went wrong, please try again.";
				$timeout(function(){
					$rootScope.errorMessage
				},2000);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};

	function fetchPassword(usrNm, secans){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/fetch_password',
				params: {
					parameters: {
						usrNm: usrNm,
						secans: secans
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				resolve(response.data[0]);
			}, function errorCallback(err) {
				reject(err);
				$rootScope.errorMessage = "Something went wrong, please try again.";
				$timeout(function(){
					$rootScope.errorMessage
				},2000);
				$rootScope.loader = null;
			});//$http finish
		});//$q finish
	};

	function getLocalAvatars(){
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: './json/avatars.json'
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	};
}