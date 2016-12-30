angular.module("Qeen")
	.controller("ProfileController", ProfileController);

ProfileController.$inject = ["QuestionsService", "UserService", "ProjectsService", "$rootScope", "$location", "$routeParams", "$timeout"];

function ProfileController(QuestionsService, UserService, ProjectsService, $rootScope, $location, $routeParams, $timeout){
	var vm = this;
	vm.loggedInUser = null;
	vm.userId = null;
	vm.changePicFlag = false;
	vm.userDetails = null;
	vm.userNotFoundFlag = false;
	vm.userprojects = null;
	vm.userQuestions = null;
	vm.selectedAvatar = null;
	vm.totalQuestionCount = null;
	vm.avatars = new Array();
	vm.activeTab = "projects";
	vm.init = init;
	vm.askQuestion = askQuestion;
	vm.changeProfilePic = changeProfilePic;
	vm.closePopup = closePopup;
	vm.filterAvatars = filterAvatars;
	vm.selectAvatar = selectAvatar;
	vm.confirmDP = confirmDP;
	vm.changeTab = changeTab;
	vm.filterQuestionsData = filterQuestionsData;
	vm.loadProjectsData = loadProjectsData;
	vm.getUserQuestions = getUserQuestions;
	vm.goToDashboard = goToDashboard;
	vm.updateQuestionCount = updateQuestionCount;
	vm.getBookmarkedQues = getBookmarkedQues;

	function init(){
		vm.userNotFoundFlag = false;
		if(sessionStorage.getItem("userdets")){
			vm.userId = $routeParams.userDet;
			vm.loggedInUser = $rootScope.userdets.userId;
			if($rootScope.userdets.userId == undefined){
				vm.init();
				return;
			}
			else{
				UserService.getUserDetails(vm.userId)
					.then(function(response){
						vm.userDetails = response;
						vm.getBookmarkedQues();
						UserService.getLocalAvatars()
							.then(function(responseAva){
								vm.avatars = responseAva.Avatars;
								vm.filterAvatars();
							})
							.catch(function(err){
								console.log(err);
							});
					})
					.catch(function(error){
						console.log(error);
						vm.userNotFoundFlag = true;
					});

				vm.loadProjectsData();
			}
		}
		else{
			$location.path('/sign-in');
		}
	}

	function askQuestion(){
		$location.path('/ask-question');
	}

	function changeProfilePic(){
		vm.changePicFlag = true;
	}

	function changeTab(tab){
		if(vm.activeTab != tab)
		{
			if(tab == "projects")
			{
				vm.loadProjectsData();
			}
			if(tab == "questions")
			{
				vm.getUserQuestions();
			}
		}
		vm.activeTab = tab;
	}

	function closePopup(){
		vm.changePicFlag = false;
		vm.selectedAvatar = null;
		for(var i=0; i<vm.avatars.length; i++){
			vm.avatars[i].isSelected = false;
		}
	}

	function filterAvatars(){
		for(var i=0; i<vm.avatars.length; i++){
			if(vm.avatars[i].avatarName == $rootScope.userAvatar){
				vm.avatars.splice(i,1);
				break;
			}
		}
	}

	function selectAvatar(index){
		for(var i=0; i<vm.avatars.length; i++){
			vm.avatars[i].isSelected = false;
		}

		vm.avatars[index].isSelected = true;
		vm.selectedAvatar = vm.avatars[index];
	}

	function confirmDP(){
		$rootScope.userAvatar = null;
		UserService.changeAvatar(vm.userId, vm.selectedAvatar.avatarName)
			.then(function(response){
				$rootScope.userAvatar = response[0].userAvatar;
				vm.userDetails.userAvatar = response[0].userAvatar;
				vm.closePopup();
			})
			.catch(function(err){
				console.log(err);
			});
	}

	function loadProjectsData(){
		ProjectsService.getUsersPrjs(vm.userId)
			.then(function(response){
				vm.userprojects = response;
				angular.forEach(vm.userprojects, function(value, key) {
					if(value.projId == '1'){
						vm.userprojects.splice(key,1);
						return;
					}
				});
				vm.totalQuestionCount = 0;
				for(var i=0; i<vm.userprojects.length; i++)
				{
					(function(e){
						QuestionsService.getQuestionsWithUsers(vm.userprojects[e].projId)
						.then(function(responseQues){
							vm.userprojects[e].questionData = vm.filterQuestionsData(responseQues);
							if(e == vm.userprojects.length-1)
							{
								vm.updateQuestionCount();
							}
						})
						.catch(function(error){
							console.log(error);
						});
					})(i);
				}
			})
			.catch(function(error){
				console.log(error)
			});
	}

	function updateQuestionCount(){
		var flag = false;
		angular.forEach(vm.userprojects, function(value, key) {
			if(value.questionData == undefined){
				flag = true;
				return;
			}
		});
		if(flag == true){
			$timeout(function(){
				vm.updateQuestionCount();
			},2000);
		}
		else{
			var tmpQuestions = new Array();
			angular.forEach(vm.userprojects, function(value, key) {
				angular.forEach(vm.userprojects[key].questionData, function(valueQ, keyQ) {
					tmpQuestions.push(valueQ.quesId);
				});
			});

			uniqueArray = tmpQuestions.filter(function(item, pos, self) {
				return self.indexOf(item) == pos;
			});
			vm.totalQuestionCount = uniqueArray.length;
			uniqueArray = null;
			tmpQuestions = null;
		}
	}
	function filterQuestionsData(data){
		var dt;
		for(var i=0; i<data.length; i++){
			(function(e){
				dt = data[e];
				if(data[e].tags == undefined){
					data[e].tags = new Array();
					data[e].tags[0] = data[e].langName;
				}

				for(var j=(e+1); j<data.length; j++){
					(function(f){
						if(data[f] != null || data[f] !=undefined){
							if(dt.quesId == data[f].quesId){
								data[e].tags.push(data[f].langName);
								data.splice(f,1);
								f--;
							}
						}
					})(j);
				}
			})(i);
		}
		return (data);
		data = null;
	}

	function getUserQuestions(){
		QuestionsService.getQuestionsFromUser(vm.userId)
			.then(function(response){
				vm.userQuestions = response;
			})
			.catch(function(error){
				console.log(error);
			});
	}

	function goToDashboard(){
		$location.path('/');
	}
	
	function getBookmarkedQues(){
		QuestionsService.getBookmarkedQues(vm.userId)
			.then(function(response){
				vm.bookmarkedQuestions = response;
			})
			.catch(function(error){
				console.log(error);
			});
	}
	vm.init();
};