angular.module("Qeen")
	.service("AnswersService", AnswersService);

AnswersService.$inject = ["$http", "Backand", "$q", "$rootScope", "$timeout"];

function AnswersService($http, Backand, $q, $rootScope, $timeout){
	var vm = this;
	vm.answerVoteUp = answerVoteUp;
	vm.answerVoteDown = answerVoteDown;
	vm.postAnswer = postAnswer;
	vm.deleteAnswer = deleteAnswer;
	vm.updateAnswer = updateAnswer;
	vm.postAnswerCmnt = postAnswerCmnt;
	vm.getAnswerComments = getAnswerComments;
	vm.removeAnswerVoteUp = removeAnswerVoteUp;
	vm.removeAnswerVoteDown = removeAnswerVoteDown;

	function answerVoteUp(queId, ansId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			if(usrId != null){
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/answer_up_vote',
					params: {
						parameters: {
							queId: queId,
							usrId: usrId,
							ansId: ansId
						}
					}
				}).then(function successCallback(response) {
					$rootScope.loader = null;
					resolve(response.data);
				}, function errorCallback(err) {
					reject(err);
				});//$http finish
			}
			else{
				$rootScope.loader = null;
				$rootScope.errorMessage = "Please login.";
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject("Please login");
			}
		});//$q finish
	}
	
	function removeAnswerVoteUp(queId, ansId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			if(usrId != null){
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/remove_ansup_vote',
					params: {
						parameters: {
							queId: queId,
							usrId: usrId,
							ansId: ansId
						}
					}
				}).then(function successCallback(response) {
					$rootScope.loader = null;
					resolve(response.data);
				}, function errorCallback(err) {
					reject(err);
				});//$http finish
			}
			else{
				$rootScope.loader = null;
				$rootScope.errorMessage = "Please login.";
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject("Please login");
			}
		});//$q finish
	}
	
	function removeAnswerVoteDown(queId, ansId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			if(usrId != null){
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/remove_ansdown_vote',
					params: {
						parameters: {
							queId: queId,
							usrId: usrId,
							ansId: ansId
						}
					}
				}).then(function successCallback(response) {
					$rootScope.loader = null;
					resolve(response.data);
				}, function errorCallback(err) {
					reject(err);
				});//$http finish
			}
			else{
				$rootScope.loader = null;
				$rootScope.errorMessage = "Please login.";
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject("Please login");
			}
		});//$q finish
	}

	function answerVoteDown(queId, ansId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			if(usrId != null){
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/answer_down_vote',
					params: {
						parameters: {
							queId: queId,
							usrId: usrId,
							ansId: ansId
						}
					}
				}).then(function successCallback(response) {
					$rootScope.loader = null;
					resolve(response.data);
				}, function errorCallback(err) {
					reject(err);
				});//$http finish
			}
			else{
				$rootScope.loader = null;
				$rootScope.errorMessage = "Please login.";
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject("Please login");
			}
		});//$q finish
	}

	function postAnswer(ansDets){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/add_answer',
				params: {
					parameters: ansDets
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	}

	function postAnswerCmnt(cmntObj){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/add_ans_cmnt',
				params: {
					parameters: cmntObj
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage = "Comment posted";
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500)
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.errorMessage = "Something went wrong, please try again later.";
				$timeout(function(){
					$rootScope.errorMessage = null;
				},1500)
				reject(err);
			});//$http finish
		});//$q finish
	}

	function deleteAnswer(ansId, queId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/delete_answer_id',
				params: {
					parameters: {
						ansId: ansId,
						queId: queId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage="Delete successful.";
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.errorMessage="Delete failed.";
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject(err);
			});//$http finish
		});//$q finish
	}

	function updateAnswer(ansId, edtText){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/update_answer_id',
				params: {
					parameters: {
						ansId: ansId,
						ansDesc: edtText
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage="Answer updated.";
				$timeout(function(){
					$rootScope.successMessage = null;
				},1500);
				resolve(response.data);
			}, function errorCallback(err) {
				$rootScope.errorMessage="Update failed.";
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
				reject(err);
			});//$http finish
		});//$q finish
	}

	function getAnswerComments(ansId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/get_ans_cmnts',
				params: {
					parameters: {
						ansId: ansId
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	}
};