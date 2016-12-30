angular.module("Qeen")
	.controller("QuestionTagsController", QuestionTagsController);

QuestionTagsController.$inject = ["QuestionsService", "TagsService", "$rootScope"];

function QuestionTagsController(QuestionsService, TagsService, $rootScope){
	var vm = this;
	vm.pageTitle = "Tags";
	vm.allTags = null;
	vm.tagQuestions = null;
	vm.selectedTagNm = null;
	vm.showQuestionsFlag = false;
	vm.init = init;
	vm.getAllQuestionsWithTags = getAllQuestionsWithTags;
	vm.loadQuestionOfTag = loadQuestionOfTag;
	vm.showAllTags = showAllTags;

	function init(){
		if(sessionStorage.getItem("userdets")){
			vm.userId = $rootScope.userdets.userId;
			if($rootScope.userdets.userId == undefined){
				vm.init();
				return;
			}
		}
		vm.getAllQuestionsWithTags();
	}

	function getAllQuestionsWithTags(){
		TagsService.getAllTagWithQuestions()
			.then(function(response){
				vm.allTags = response;
			})
			.catch(function(error){
				console.log(error);
			});
	}

	function loadQuestionOfTag(langDets){
		vm.pageTitle = "Questions"
		vm.showQuestionsFlag = true;
		vm.selectedTagNm = langDets.langName;
		QuestionsService.loadTagQuestions(langDets.langId)
			.then(function(response){
				vm.tagQuestions = response;
			})
			.catch(function(err){
				console.log(err);
			});
	}

	function showAllTags(){
		vm.pageTitle = "Tags"
		vm.showQuestionsFlag = false;
		vm.selectedTagNm = null;
	}
	vm.init();
}
