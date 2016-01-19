quiz.controller('QuizController', ['$scope', 'ServiceAPI', '$location', '$rootScope', '$route', function($scope, ServiceAPI, $location, $rootScope, $route) {
	$scope.showQuestionContainer=false;
	$scope.allQuestions=new Array();
	$scope.currQuestion=new Array();
	$scope.correctAnswers=new Array();
	$scope.limitQuestions=1;
	$scope.questionCnt=0;
	$scope.score=0;
	$scope.selOpt=0;
	$scope.titleText="";	
	
	$scope.startQuiz = function(diffVal){
		ServiceAPI.loadService('db/'+diffVal+'.json', 'GET').then(function(response){			
			$scope.showQuestionContainer=true;
			$scope.shuffleQuestions(response.test);
			$scope.allQuestions=response.test;
			$scope.limitQuestions=$scope.selectQuestions			
			$scope.limitArrayTo($scope.limitQuestions);
			$scope.currQuestion=$scope.allQuestions[$scope.questionCnt];
		}).catch(function(){
			alert('Sorry .. Questions cannot be loaded Please try again.');
			$route.reload();
		});
	};

	$scope.selectOption = function(optVal){
		$scope.selOpt=optVal;
	}

	$scope.$watch('selectQuestions', function(response){
		if(response==undefined){
			$scope.titleText="Select number of question's";	
		}
		else{
			$scope.titleText="Start Quiz";	
		}
	});

	$scope.nextQuestion = function(){
		if($scope.selOpt==parseInt($scope.currQuestion.CorrectAns))
		{
			$scope.score++;
			$scope.currQuestion.isCorrect=true;
		}
		else{
			$scope.currQuestion.isCorrect=false;
		}
			$scope.currQuestion.completeCorrAns = $scope.currQuestion["Opt"+$scope.currQuestion.CorrectAns];
			$scope.currQuestion.userEnterAns = $scope.currQuestion["Opt"+$scope.selOpt];
		//console.log($scope.currQuestion);
			$scope.correctAnswers.push($scope.currQuestion);
		//console.log($scope.currQuestion["Opt"+$scope.currQuestion.CorrectAns]);
		//console.log($scope.correctAnswers);
		$scope.selOpt=0;
		$scope.questionCnt++;
		if($scope.questionCnt==$scope.allQuestions.length){
			localStorage.setItem("score",$scope.score);
			localStorage.setItem("correctAnswers",JSON.stringify($scope.correctAnswers));
			$location.path('results');
		}
		$scope.currQuestion=$scope.allQuestions[$scope.questionCnt];
	}

	$scope.shuffleQuestions = function(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
		}
		//console.log(array)
		return array;
	};	
	
	$scope.limitArrayTo = function(limitVal){	
		if(limitVal<=$scope.allQuestions.length){
			var tmpArr=$scope.allQuestions.slice(0,limitVal);
			//console.log(tmpArr)
			$scope.allQuestions=tmpArr;
			tmpArr=null;
		}
		else{
			alert('Error while limiting the questions.\n\n Default '+ $scope.allQuestions.length + " questions loaded.");
		}
	};
}]);