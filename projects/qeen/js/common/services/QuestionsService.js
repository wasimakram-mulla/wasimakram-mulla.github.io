angular.module("Qeen")
	.service("QuestionsService", QuestionsService);

QuestionsService.$inject = ["$http", "Backand", "$q", "$rootScope", "$timeout"];

function QuestionsService($http, Backand, $q, $rootScope, $timeout){
	var vm = this;
	vm.getAllQuestions = getAllQuestions;
	vm.getQuestionsWithUsers = getQuestionsWithUsers;
	vm.getQuestionsFromId = getQuestionsFromId;
	vm.getAnswerQuesId = getAnswerQuesId;
	vm.postQuestion = postQuestion;
	vm.increaseViewCount = increaseViewCount;
	vm.questionVoteUp = questionVoteUp;
	vm.removeQuestionVoteUp = removeQuestionVoteUp;
	vm.questionVoteDown = questionVoteDown;
	vm.removeQuestionVoteDown = removeQuestionVoteDown;
	vm.updateQuesionDesc = updateQuesionDesc;
	vm.deleteQuestionData = deleteQuestionData;
	vm.questionVoteDelete = questionVoteDelete;
	vm.getQuestionsFromUser = getQuestionsFromUser;
	vm.loadTagQuestions = loadTagQuestions;
	vm.bookmarkQuestion = bookmarkQuestion;
	vm.removeBookmark = removeBookmark;
	vm.checkBookmark = checkBookmark;
	vm.getBookmarkedQues = getBookmarkedQues;
	vm.checkForQuestionVoted = checkForQuestionVoted;
	vm.checkForAnswerVoted = checkForAnswerVoted;

	function getAllQuestions(){
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

	function increaseViewCount(queId){
		return $q(function(resolve, reject) {
			$http({
			  method: 'GET',
			  url: Backand.getApiUrl() + '/1/query/data/increase_view_count',
				params: {
					parameters: {
						queId: queId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	};

	function checkForQuestionVoted(queId, usrId){
		return $q(function(resolve, reject) {
			$http({
			  method: 'GET',
			  url: Backand.getApiUrl() + '/1/query/data/check_que_voted',
				params: {
					parameters: {
						queId: queId,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data[0]);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	};

	function checkForAnswerVoted(ansId, usrId){
		return $q(function(resolve, reject) {
			$http({
			  method: 'GET',
			  url: Backand.getApiUrl() + '/1/query/data/check_ans_voted',
				params: {
					parameters: {
						ansId: ansId,
						usrId: usrId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data[0]);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	};

	function loadTagQuestions(langId){
		$rootScope.loader = true;
		$rootScope.loadMessage = "Loading questions.";
		return $q(function(resolve, reject) {
			$http({
			  method: 'GET',
			  url: Backand.getApiUrl() + '/1/query/data/all_tag_questions',
				params: {
					parameters: {
						langId: langId
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

	function updateQuesionDesc(queId, edtText, edtTitle){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$http({
			  method: 'GET',
			  url: Backand.getApiUrl() + '/1/query/data/update_quesdesc_id',
				params: {
					parameters: {
						queId: queId,
						queDesc: edtText,
						queTitle: edtTitle
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.successMessage = "Question updated";
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
	};

	function getQuestionsWithUsers(prjId){
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/ques_user_tags',
				params: {
					parameters: {
						prjId: prjId.toString()
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	};

	function deleteQuestionData(queId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$rootScope.loadMessage = "Removing Question.";
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/delete_question',
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

	function getQuestionsFromId(queId){
		$rootScope.loader = true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/get_ques_fromId',
				params: {
					parameters: {
						queId: queId
					}
				}
			}).then(function successCallback(response) {
				if(response.data.length>0)
				{
					resolve(response.data);
				}
				else
				{
					$rootScope.loader = null;
					$rootScope.errorMessage = "Something went wrong, please wait redirecting you back."
					$timeout(function(){
						$rootScope.errorMessage = null;
						reject("Cannot find question");
					},2000);
				}
			}, function errorCallback(err) {
				$rootScope.loader = null;
				$rootScope.errorMessage = "Something went wrong, please wait redirecting you back."
				$timeout(function(){
					$rootScope.errorMessage = null;
					reject(err);
				},2000);
			});//$http finish
		});//$q finish
	};

	function getAnswerQuesId(quesId){
		$rootScope.loadMessage="Loading answers"
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/Answer_queId',
				params: {
					parameters: {
						queId: quesId.toString()
					}
				}
			}).then(function successCallback(response) {
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
				resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
			});//$http finish
		});//$q finish
	}

	function postQuestion(quesObj, prjs, tags){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/add_question',
				params: {
					parameters: quesObj
				}
			}).then(function successCallback(response) {
				for(var i=0; i<tags.length; i++)
				{
					(function(e){
						$http({
							method: 'GET',
							url: Backand.getApiUrl() + '/1/query/data/add_ques_tag',
							params: {
								parameters: {
									lanId: tags[e].langId
								}
							}
						}).then(function successCallback(response) {
							//resolve(response.data);
							if(e == tags.length-1){
								for(var j=0; j<prjs.length; j++)
								{
									(function(f){
										$http({
											method: 'GET',
											url: Backand.getApiUrl() + '/1/query/data/add_proj_ques',
											params: {
												parameters: {
													projectId: prjs[f].projId
												}
											}
										}).then(function successCallback(response) {
											if(f == prjs.length-1){
												$rootScope.loader=null;
												$rootScope.successMessage = "Question posted successfully."
												$timeout(function(){
													$rootScope.successMessage = null;
												},2000);
												resolve("All queries fired successfully");
											}
										}, function errorCallback(err) {
											reject(err);
											$rootScope.loader=null;
											$rootScope.errorMessage = "Problem while posting question !!!"
											$timeout(function(){
												$rootScope.errorMessage = null;
											},2000);
										});	//Project Tags $http finish
									})(j);
								}
							}
						}, function errorCallback(err) {
							reject(err);
							$rootScope.loader=null;
							$rootScope.errorMessage = "Problem while posting question !!!"
							$timeout(function(){
								$rootScope.errorMessage = null;
							},2000);
						});//Language Tags $http finish
					})(i);
				}
				//resolve(response.data);
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader=null;
				$rootScope.errorMessage = "Problem while posting question !!!"
				$timeout(function(){
					$rootScope.errorMessage = null;
				},2000);
			});//$http finish
		});//$q finish
	}

	function questionVoteUp(queId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			if(usrId != null){
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/question_up_vote',
					params: {
						parameters: {
							queId: queId,
							usrId: usrId
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

	function removeQuestionVoteUp(queId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			if(usrId != null){
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/remove_quesup_vote',
					params: {
						parameters: {
							queId: queId,
							usrId: usrId
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

	function questionVoteDown(queId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			if(usrId != null){
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/question_down_vote',
					params: {
						parameters: {
							queId: queId,
							usrId: usrId
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

	function removeQuestionVoteDown(queId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			if(usrId != null){
				$http({
					method: 'GET',
					url: Backand.getApiUrl() + '/1/query/data/remove_quesdown_vote',
					params: {
						parameters: {
							queId: queId,
							usrId: usrId
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

	function questionVoteDelete(queId){
		$rootScope.loader=true;
		$rootScope.loadMessage = "removing all Votes.";
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/question_delete_vote',
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
	}

	function getQuestionsFromUser(usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/question_user',
				params: {
					parameters: {
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
	}

	function bookmarkQuestion(queId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/bookmark_add',
				params: {
					parameters: {
						queId: queId,
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
	}

	function removeBookmark(queId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/bookmark_remove',
				params: {
					parameters: {
						queId: queId,
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
	}

	function checkBookmark(queId, usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/bookmark_check',
				params: {
					parameters: {
						queId: queId,
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
	}

	function getBookmarkedQues(usrId){
		$rootScope.loader=true;
		return $q(function(resolve, reject) {
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/bookmark_ques',
				params: {
					parameters: {
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
	}
}