angular.module("Qeen")
	.controller("AllQuestionsController", AllQuestionsController);

AllQuestionsController.$inject = ["QuestionsService", "ProjectsService", "$rootScope", "$route", "$location"];

function AllQuestionsController(QuestionsService, ProjectsService, $rootScope, $route, $location){
	var vm = this;
	vm.userId = null;
	vm.questionsData = null;
	vm.prjQuestionsData = null;
	vm.prjQuestionsPanel = false;
	vm.userprojects = null;
	vm.selectedQuesTab = 1;
	vm.init = init;
	vm.getQuestionsData = getQuestionsData;
	vm.selectProject = selectProject;
	vm.filterQuestionsData = filterQuestionsData;
	vm.loadAllQuestions = loadAllQuestions;
	vm.loadTagQuestions = loadTagQuestions;

	function init(){
		vm.getQuestionsData();

		if(sessionStorage.getItem("userdets")){
			vm.userId = $rootScope.userdets.userId;
			if($rootScope.userdets.userId == undefined){
				vm.init();
				return;
			}
			ProjectsService.getUsersPrjs(vm.userId)
			.then(function(response){
				vm.userprojects = response;
				for(var i=0; i<vm.userprojects.length; i++)
				{
					(function(e){
						if(vm.userprojects[e].projId !="1")
						{
							QuestionsService.getQuestionsWithUsers(vm.userprojects[e].projId)
							.then(function(responseQues){
								vm.userprojects[e].questionData = vm.filterQuestionsData(responseQues);
							})
							.catch(function(error){
								console.log(error);
							});
						}
					})(i);
				}
			})
			.catch(function(error){
				console.log(error)
			});
		}
	}

	function loadAllQuestions(){
		$route.reload();
	}

	function selectProject(selPrj, index){
		vm.prjQuestionsPanel = true;
		vm.selectedQuesTab = index;
		vm.prjQuestionsData = selPrj.questionData;
	}

	function getQuestionsData(){
		var quesData = null;
		$rootScope.loader = true;
		QuestionsService.getQuestionsWithUsers(1)
			.then(function(response){
				vm.questionsData = angular.copy(vm.filterQuestionsData(response));
				$rootScope.loader = null;
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

	function loadTagQuestions(){
		$location.path("/question-tags")
	}

	vm.init();
}
