angular.module("Qeen")
	.controller("AskQuestionController", AskQuestionController);

AskQuestionController.$inject = ["QuestionsService", "ProjectsService", "TagsService", "$location", "$rootScope", "$timeout"];

function AskQuestionController(QuestionsService, ProjectsService, TagsService, $location, $rootScope, $timeout){
	var vm = this;
	vm.userId = null;
	vm.allTags = null;
	vm.tagLimit = 4;
	vm.selectedTags = new Array();
	vm.selectedPrjs = new Array();
	vm.userprojects = null;
	vm.init = init;
	vm.addTag = addTag;
	vm.toggleProjectSel = toggleProjectSel;
	vm.postQuestion = postQuestion;
	vm.removeTag = removeTag;

	function init(){
		if(!sessionStorage.getItem("userdets")){
			$rootScope.previousPath = $location.path();
			$location.path('/sign-in');
		}
		else{
			vm.userId = $rootScope.userdets.userId;
			if($rootScope.userdets.userId == undefined){
				vm.init();
			}
			ProjectsService.getUsersPrjs(vm.userId)
			.then(function(response){
				vm.userprojects = response;

				TagsService.getAllTags()
					.then(function(responseTags){
						vm.allTags=angular.copy(responseTags);
					})
					.catch(function(errTags){
						console.log(errTags)
					});
			})
			.catch(function(error){
				console.log(error)
			});
		}
	};

	function removeTag(selTag){
		for(var i=0; i<vm.selectedTags.length; i++){
			if(selTag.langName == vm.selectedTags[i].langName){
				vm.allTags.push(vm.selectedTags[i]);
				vm.selectedTags.splice(i,1);
				break;
			}
		}
	}

	function addTag(){
		var flag=false;
		for(var i=0; i<vm.allTags.length; i++){
			if(vm.searchTag.toLowerCase() == vm.allTags[i].langName.toLowerCase()){
				vm.selectedTags.push(vm.allTags[i]);
				vm.allTags.splice(i,1);
				flag = true;
				break;
			}
		}
		if(flag == false){
			$rootScope.errorMessage = "Cannot find tag !!!";
			$timeout(function(){
				$rootScope.errorMessage = null;
			},1300);
		}
		vm.searchTag = null;
	}

	function toggleProjectSel(selprj){
		var prjPresentFlag = false;
		var index=-1;
		for(var i=0; i<vm.selectedPrjs.length; i++){
			if(vm.selectedPrjs[i].id == selprj.id){
				prjPresentFlag = true;
				index = i;
				break;
			}
		}

		if(prjPresentFlag == true){
			vm.selectedPrjs.splice(index,1);
		}
		else{
			vm.selectedPrjs.push(angular.copy(selprj));
		}
		prjPresentFlag = null;
		index = null;
	}

	function postQuestion(){
		var dt = new Date();
		var questionObj = {
			queTitle: vm.questionTitle,
			queDesc: vm.quesDesc,
			usrId: vm.userId,
			postOn: dt.getTime()
		}
		QuestionsService.postQuestion(questionObj, vm.selectedPrjs, vm.selectedTags)
			.then(function(response){
				$location.path('/');
			})
			.catch(function(error){
				console.log(error)
			});
		/* Managing of Check box is a bit complex. Try to do the same using simple arrays */
	}

	vm.init();
};