angular.module("Qeen")
	.controller("QuestionDetailsController", QuestionDetailsController);

QuestionDetailsController.$inject = ["QuestionsService", "ProjectsService", "AnswersService", "TagsService", "$rootScope", "$location", "$routeParams", "$timeout"];

function QuestionDetailsController(QuestionsService, ProjectsService, AnswersService, TagsService, $rootScope, $location, $routeParams, $timeout){
	var vm=this;
	vm.userId = null;
	vm.quesId = null;
	vm.questionData = null;
	vm.answersData = null;
	vm.delContent = null;
	vm.edtContent = null;
	vm.editingQueAns = null;
	vm.deletingQueAns = null;
	vm.questionInEditMode = false;
	vm.deleteAnswerFlag = false;
	vm.bookmarkQueFlag = false;
	vm.activeQuesVoteUp = false;
	vm.activeQuesVoteDown = false;
	vm.bookmarkText = "Bookmark this question";
	vm.prevIndex = 0;
	vm.dispCommentBox = new Array();
	vm.init = init;
	vm.questionVoteUp = questionVoteUp;
	vm.questionVoteDown = questionVoteDown;
	vm.answerVoteUp = answerVoteUp;
	vm.answerVoteDown = answerVoteDown;
	vm.filterQuestionsData = filterQuestionsData;
	vm.increaseQuestionViewCount = increaseQuestionViewCount;
	vm.addEnterKeyToAns = addEnterKeyToAns;
	vm.scrollBottom = scrollBottom;
	vm.postAnswer = postAnswer;
	vm.editComment = editComment;
	vm.editQuestion = editQuestion;
	vm.deleteAnsEvent = deleteAnsEvent;
	vm.removeQueAns = removeQueAns;
	vm.updateQueAns = updateQueAns;
	vm.closePopup = closePopup;
	vm.closeDelPopup = closeDelPopup;
	vm.showCommentBox = showCommentBox;
	vm.postComment = postComment;
	vm.getAnsComments = getAnsComments;
	vm.hideCommentBox = hideCommentBox;
	vm.deleteQuestion = deleteQuestion;
	vm.loadTagQuestions = loadTagQuestions;
	vm.updateUserPoints = updateUserPoints;
	vm.bookmarkQuestion = bookmarkQuestion;
	vm.checkBookmark = checkBookmark;
	vm.checkAnswerVotes = checkAnswerVotes;

	function init(){
		vm.quesId = $routeParams.quePath;
		$rootScope.previousPath = $location.path();
		if(sessionStorage.getItem("userdets")){
			if($rootScope.userdets.userId != undefined)
			{
				vm.userId = $rootScope.userdets.userId;
			}
			else{
				vm.init();
			}
		}
		QuestionsService.getQuestionsFromId(vm.quesId)
			.then(function(response){
				vm.questionData = vm.filterQuestionsData(response)[0];
				QuestionsService.getAnswerQuesId(vm.questionData.quesId)
					.then(function(responseAns){
						vm.answersData = responseAns;
						vm.dispCommentBox = new Array();
						for(var i=0; i<vm.answersData.length; i++)
						{
							vm.dispCommentBox.push({show:false});
						}
						vm.checkBookmark();
						vm.getAnsComments();
						vm.checkAnswerVotes();
					})
					.catch(function(err){
						console.log(err);
					})
				if(vm.userId != vm.questionData.userId){
					vm.increaseQuestionViewCount(vm.questionData.quesId);
				}
			})
			.catch(function(error){
				console.log(error);
				$location.path('/');
			});

		QuestionsService.checkForQuestionVoted(vm.quesId, vm.userId)
			.then(function(response){
				if(response != undefined){
					if(response.vote_updown == "up")
					{
						vm.activeQuesVoteUp = true;
					}
					else{
						vm.activeQuesVoteDown = true;
					}
				}
				else{
					vm.activeQuesVoteUp = false;
					vm.activeQuesVoteDown = false;
				}
			})
			.catch(function(error){
				console.log(error);
			});
	}

	function filterQuestionsData(data){
		var dt;
		for(var i=0; i<data.length; i++){
			dt = data[i];
			if(data[i].tags == undefined){
				data[i].tags = new Array();
				data[i].tags[0] = data[i].langName;
			}

			for(var j=(i+1); j<data.length; j++){
				if(data[j] != null || data[j] !=undefined){
					if(dt.quesId == data[j].quesId){
						data[i].tags.push(data[j].langName);
						data.splice(j,1);
						j--;
					}
				}
			}
		}
		return (data);
		data = null;
	}

	function increaseQuestionViewCount(quesId){
		QuestionsService.increaseViewCount(quesId)
			.then(function(response){
				vm.questionData.views = response[0].views;
			})
			.catch(function(error){
				console.log(error);
			});
	}

	function questionVoteUp(){
		if(vm.activeQuesVoteDown == true){
				if(vm.userId != vm.questionData.userId){
					QuestionsService.removeQuestionVoteDown(vm.quesId, vm.userId)
					.then(function(responseVoteDown){
						QuestionsService.questionVoteUp(vm.quesId, vm.userId)
							.then(function(responseVoteUp){
								vm.activeQuesVoteUp = true;
								vm.activeQuesVoteDown = false;
								vm.questionData.userPoints = responseVoteUp[0].userPoints;
								vm.questionData.votes = responseVoteUp[0].votes;
								vm.updateUserPoints(vm.questionData.userId, responseVoteUp[0].userPoints);
							})
							.catch(function(errorVoteUp){
								console.log(errorVoteUp);
							});
					})
					.catch(function(errorVoteDown){
						console.log(errorVoteDown);
					});
				}
				else{
					$rootScope.errorMessage = "You cannot vote your own question";
					$timeout(function(){
						$rootScope.errorMessage = null;
					},1500);
				}
		}
		else{
			if(vm.activeQuesVoteUp == false){
				if(vm.userId != vm.questionData.userId){
					QuestionsService.questionVoteUp(vm.quesId, vm.userId)
						.then(function(response){
							vm.activeQuesVoteUp = true;
							vm.questionData.userPoints = response[0].userPoints;
							vm.questionData.votes = response[0].votes;
							vm.updateUserPoints(vm.questionData.userId, response[0].userPoints);
						})
						.catch(function(error){
							console.log(error);
						});
				}
				else{
					$rootScope.errorMessage = "You cannot vote your own question";
					$timeout(function(){
						$rootScope.errorMessage = null;
					},1500);
				}
			}
			else{
				QuestionsService.removeQuestionVoteUp(vm.quesId, vm.userId)
					.then(function(response){
						vm.activeQuesVoteUp = false;
						vm.questionData.userPoints = response[0].userPoints;
						vm.questionData.votes = response[0].votes;
						vm.updateUserPoints(vm.questionData.userId, response[0].userPoints);
					})
					.catch(function(error){
						console.log(error);
					});
			}
		}
	};

	function questionVoteDown(){
		if(vm.activeQuesVoteUp == true){
			QuestionsService.removeQuestionVoteUp(vm.quesId, vm.userId)
					.then(function(responseVoteUp){
					QuestionsService.questionVoteDown(vm.quesId, vm.userId)
						.then(function(response){
							vm.activeQuesVoteUp = false;
							vm.activeQuesVoteDown = true;
							vm.questionData.userPoints = response[0].userPoints;
							vm.questionData.votes = response[0].votes;
							vm.updateUserPoints(vm.questionData.userId, response[0].userPoints);
						})
						.catch(function(error){
							console.log(error);
						});
				})
				.catch(function(errorVoteUp){
					console.log(errorVoteUp);
				});
		}
		else{
			if(vm.activeQuesVoteDown == false){
				if(vm.userId != vm.questionData.userId){
					QuestionsService.questionVoteDown(vm.quesId, vm.userId)
					.then(function(response){
						vm.activeQuesVoteDown = true;
						vm.questionData.userPoints = response[0].userPoints;
						vm.questionData.votes = response[0].votes;
						vm.updateUserPoints(vm.questionData.userId, response[0].userPoints);
					})
					.catch(function(error){
						console.log(error);
					});
				}
				else{
					$rootScope.errorMessage = "You cannot vote your own question";
					$timeout(function(){
						$rootScope.errorMessage = null;
					},1500);
				}
			}
			else{
				QuestionsService.removeQuestionVoteDown(vm.quesId, vm.userId)
					.then(function(response){
						vm.activeQuesVoteDown = false;
						vm.questionData.userPoints = response[0].userPoints;
						vm.questionData.votes = response[0].votes;
						vm.updateUserPoints(vm.questionData.userId, response[0].userPoints);
					})
					.catch(function(error){
						console.log(error);
					});
			}
		}
	};

	function answerVoteUp(ansId, index, usrId){
		if(vm.answersData[index].ansVoteDown == false){
			if(vm.answersData[index].ansVoteUp == false)
			{
				if(vm.userId != usrId){
					AnswersService.answerVoteUp(vm.quesId, ansId, vm.userId)
					.then(function(response){
						vm.answersData[index].ansVoteUp = true;
						vm.answersData[index].userPoints = response[0].userPoints;
						vm.answersData[index].votes = response[0].votes;
						vm.updateUserPoints(vm.answersData[index].userId, response[0].userPoints);
					})
					.catch(function(error){
						console.log(error);
					});
				}
				else{
					$rootScope.errorMessage = "You cannot vote your own answer";
					$timeout(function(){
						$rootScope.errorMessage = null;
					},1500);
				}
			}
			else{
				AnswersService.removeAnswerVoteUp(vm.quesId, ansId, vm.userId)
					.then(function(response){
						vm.answersData[index].ansVoteUp = false;
						vm.answersData[index].userPoints = response[0].userPoints;
						vm.answersData[index].votes = response[0].votes;
						vm.updateUserPoints(vm.answersData[index].userId, response[0].userPoints);
					})
					.catch(function(error){
						console.log(error);
					});
			}
		}
		else{
			AnswersService.removeAnswerVoteDown(vm.quesId, ansId, vm.userId)
				.then(function(responseRemVoteDown){
					AnswersService.answerVoteUp(vm.quesId, ansId, vm.userId)
						.then(function(response){
							vm.answersData[index].ansVoteUp = true;
							vm.answersData[index].ansVoteDown = false;
							vm.answersData[index].userPoints = response[0].userPoints;
							vm.answersData[index].votes = response[0].votes;
							vm.updateUserPoints(vm.answersData[index].userId, response[0].userPoints);
						})
						.catch(function(error){
							console.log(error);
						});
				})
				.catch(function(errorRem){
					console.log(errorRem);
				});
		}
	}

	function answerVoteDown(ansId, index, usrId){
		if(vm.answersData[index].ansVoteUp == false){
			if(vm.answersData[index].ansVoteDown == false)
			{
				if(vm.userId != usrId){
					AnswersService.answerVoteDown(vm.quesId, ansId, vm.userId)
					.then(function(response){
						vm.answersData[index].ansVoteDown = true;
						vm.answersData[index].userPoints = response[0].userPoints;
						vm.answersData[index].votes = response[0].votes;
						vm.updateUserPoints(vm.answersData[index].userId, response[0].userPoints);
					})
					.catch(function(error){
						console.log(error);
					});
				}
				else{
					$rootScope.errorMessage = "You cannot vote your own answer";
					$timeout(function(){
						$rootScope.errorMessage = null;
					},1500);
				}
			}
			else{
				AnswersService.removeAnswerVoteDown(vm.quesId, ansId, vm.userId)
					.then(function(response){
						vm.answersData[index].ansVoteDown = false;
						vm.answersData[index].userPoints = response[0].userPoints;
						vm.answersData[index].votes = response[0].votes;
						vm.updateUserPoints(vm.answersData[index].userId, response[0].userPoints);
					})
					.catch(function(error){
						console.log(error);
					});
			}
		}
		else{
			AnswersService.removeAnswerVoteUp(vm.quesId, ansId, vm.userId)
			.then(function(responseRemVoteUp){
				AnswersService.answerVoteDown(vm.quesId, ansId, vm.userId)
					.then(function(response){
						vm.answersData[index].ansVoteDown = true;
						vm.answersData[index].ansVoteUp = false;
						vm.answersData[index].userPoints = response[0].userPoints;
						vm.answersData[index].votes = response[0].votes;
						vm.updateUserPoints(vm.answersData[index].userId, response[0].userPoints);
					})
					.catch(function(error){
						console.log(error);
					});
			})
			.catch(function(errorRem){
				console.log(errorRem);
			});
		}
	}

	function updateUserPoints(usrId, userPoints){
		angular.forEach(vm.answersData, function(value, key) {
			if(value.userId == usrId){
				value.userPoints = userPoints;
			}
		});
		if(vm.questionData.userId == usrId){
			vm.questionData.userPoints = userPoints;
		}
	}

	function addEnterKeyToAns(event){
		if(event.keyCode == 13){
			if(vm.answerText != null && vm.answerText != undefined && vm.answerText != "")
			{
				vm.answerText = vm.answerText + "<br/>";
			}
			return;
		}
	}

	function scrollBottom(){
		if(vm.userId != null){
			var body = document.body,
				html = document.documentElement;
			var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
			window.scrollTo(0, height);
			html = body = height=null;
		}
		else{
			$rootScope.errorMessage = "Please login.";
			$timeout(function(){
				$rootScope.errorMessage = null;
			},1000);
		}
	}

	function postAnswer(){
		var dt = new Date();
		var ansDets = {
			queId: vm.quesId,
			ansDesc: vm.answerText,
			usrId:vm.userId,
			ansPostedOn: dt.getTime()
		};

		AnswersService.postAnswer(ansDets)
			.then(function(response){
				vm.answerText = null;
				vm.init();
			})
			.catch(function(error){
				console.log(error);
			});
	}

	function editComment(content){
		if(vm.userId != null){
			vm.editingQueAns = "answer";
			vm.questionInEditMode = true;
			vm.editText = content.ansDesc;
			vm.edtContent = content;
		}
		else{
			$rootScope.errorMessage = "Please login.";
			$timeout(function(){
				$rootScope.errorMessage = null;
			},1000);
		}
	}

	function closePopup(){
		vm.questionInEditMode = false;
		vm.editText = null;
		vm.edtContent = null;
		vm.editingQueAns = null;
		vm.deletingQueAns = null;
	}

	function closeDelPopup(){
		vm.deleteAnswerFlag = false;
		vm.delContent = null;
		vm.editingQueAns = null;
		vm.deletingQueAns = null;
	}

	function deleteAnsEvent(content){
		vm.deletingQueAns = "answer";
		vm.deleteAnswerFlag = true;
		vm.delContent = content;
	}

	function removeQueAns(){
		if(vm.deletingQueAns == 'answer'){
			AnswersService.deleteAnswer(vm.delContent.ansId, vm.quesId)
				.then(function(response){
					vm.closeDelPopup();
					vm.init();
				})
				.catch(function(error){
					console.log(error);
				});
		}
		else{
			if(vm.answersData.length>0){
				for(var i=0; i<vm.answersData.length; i++){
					(function(e){
						AnswersService.deleteAnswer(vm.answersData[e].ansId, vm.quesId)
							.then(function(response){
								if(e == (vm.answersData.length)-1)
								{
									QuestionsService.questionVoteDelete(vm.quesId)
										.then(function(response){
											//console.log("delete question tags");
											TagsService.removeQuestionTags(vm.quesId)
												.then(function(response){
													//console.log("delete projects");
													ProjectsService.removeQueFromProj(vm.quesId)
													.then(function(response){
														//console.log("at last remove Question");
														QuestionsService.deleteQuestionData(vm.quesId)
														.then(function(response){
															//console.log(response);
															//console.log('Question deleted');
															$rootScope.successMessage = "Question deleted successfully.";
															$timeout(function(){
																$rootScope.successMessage = null;
															},2000);
																$location.path('/');
														})
														.catch(function(error){
															console.log(error);
														});
													})
													.catch(function(error){
														console.log(error)
													});
												})
												.catch(function(error){
													console.log(error)
												});
										})
										.catch(function(error){
											console.log(error)
										});
								}
							})
							.catch(function(error){
								console.log(error)
							});
					})(i);
				}	//For Loop ends
			} // check ansData length finish
			else{
				QuestionsService.questionVoteDelete(vm.quesId)
					.then(function(response){
						//console.log("delete question tags");
						TagsService.removeQuestionTags(vm.quesId)
							.then(function(response){
								//console.log("delete projects");
								ProjectsService.removeQueFromProj(vm.quesId)
								.then(function(response){
									//console.log("at last remove Question");
									QuestionsService.deleteQuestionData(vm.quesId)
									.then(function(response){
										//console.log(response);
										//console.log('Question deleted');
										$rootScope.successMessage = "Question deleted successfully.";
										$timeout(function(){
											$rootScope.successMessage = null;
										},2000);
											$location.path('/');
									})
									.catch(function(error){
										console.log(error);
									});
								})
								.catch(function(error){
									console.log(error)
								});
							})
							.catch(function(error){
								console.log(error)
							});
					})
					.catch(function(error){
						console.log(error)
					});
			}
		}
	}

	function updateQueAns(){
		if(vm.editingQueAns == "answer"){
			AnswersService.updateAnswer(vm.edtContent.ansId, vm.editText)
			.then(function(response){
				vm.closePopup();
				vm.init();
			})
			.catch(function(error){
				console.log(error);
			});
		}
		else{
			QuestionsService.updateQuesionDesc(vm.questionData.quesId, vm.editText, vm.editTitle)
				.then(function(response){
					vm.closePopup();
					vm.init();
				})
				.catch(function(err){
					console.log(err)
				});
		}
	}

	function editQuestion(){
		vm.editingQueAns = "question";
		vm.questionInEditMode = true;
		vm.editTitle = vm.questionData.quesTitle;
		vm.editText = vm.questionData.quesDesc;
	}

	function deleteQuestion(){
		vm.deletingQueAns = "question";
		vm.deleteAnswerFlag = true;
	}

	function showCommentBox(index){
		if(vm.userId != null){
			vm.dispCommentBox[vm.prevIndex].show = false;
			vm.dispCommentBox[index].show = true;
			vm.prevIndex = index;
		}
		else{
			$rootScope.errorMessage = "Please login.";
			$timeout(function(){
				$rootScope.errorMessage = null;
			},1000);
		}
	}

	function hideCommentBox(){
		vm.dispCommentBox[vm.prevIndex].show = false;
		vm.prevIndex = 0;
	}

	function postComment(index, ansDets){
		var dt = new Date();
		var cmntObj = {
			ansId: ansDets.ansId,
			usrId: vm.userId,
			cmntTxt: vm.commentBox[index],
			postedOn: dt.getTime()
		}
		AnswersService.postAnswerCmnt(cmntObj)
		.then(function(response){
			vm.init();
			cmntObj = null;
			vm.commentBox[index] = null;
		})
		.catch(function(err){
			console.log(err);
		})
	}

	function getAnsComments(){
		for(var i=0; i<vm.answersData.length; i++){
			(function(e){
				AnswersService.getAnswerComments(vm.answersData[e].ansId)
					.then(function(response){
						vm.answersData[e].answerCmnts = response;
					})
					.catch(function(error){
						console.log(error)
					});
			})(i);
		}
	}

	function loadTagQuestions(){
		$location.path('/question-tags');
	}

	function bookmarkQuestion(){
		if(vm.bookmarkQueFlag == false){
			QuestionsService.bookmarkQuestion(vm.quesId, vm.userId)
			.then(function(response){
				vm.bookmarkQueFlag = true;
				vm.bookmarkText = "Remove bookmark.";
			})
			.catch(function(err){
				console.log(err);
			});
		}
		else{
			//Remove bookmark - checkBookmark
			QuestionsService.removeBookmark(vm.quesId, vm.userId)
			.then(function(response){
				vm.bookmarkQueFlag = false;
				vm.bookmarkText = "Bookmark this question";
			})
			.catch(function(err){
				console.log(err);
			});
		}
	}

	function checkBookmark(){
		QuestionsService.checkBookmark(vm.quesId, vm.userId)
			.then(function(response){
				if(response.length>0){
					vm.bookmarkText = "Remove bookmark";
					vm.bookmarkQueFlag = true;
				}
				else{
					vm.bookmarkText = "Bookmark this question";
					vm.bookmarkQueFlag = false;
				}
			})
			.catch(function(err){
				console.log(err);
			});
	}

	function checkAnswerVotes(){
		angular.forEach(vm.answersData, function(value, key) {
			if(value.userId != vm.userId){
				QuestionsService.checkForAnswerVoted(value.ansId, vm.userId)
					.then(function(response){
						if(response != undefined)
						{
							if(response.vote_updown == "up"){
								value.ansVoteUp = true;
								value.ansVoteDown = false;
							}
							else{
								value.ansVoteUp = false;
								value.ansVoteDown = true;
							}
						}
						else{
							value.ansVoteUp = false;
							value.ansVoteDown = false;
						}
					})
					.catch(function(error){
						console.log(error);
					});
			}
			else{
				value.ansVoteUp = false;
				value.ansVoteDown = false;
			}
		});
	}
	vm.init();
}