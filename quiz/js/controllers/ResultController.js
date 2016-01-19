quiz.controller('ResultController', ['$scope', 'ServiceAPI', '$location', '$rootScope', '$route', function($scope, ServiceAPI, $location, $rootScope, $route) {
	console.log('In Result Controller');
	$scope.correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'));
	$scope.score = JSON.parse(localStorage.getItem("score"));
	localStorage.removeItem('correctAnswers');
	localStorage.removeItem('score');
	$scope.startAgain = function(){
		$location.path('quiz');
	};
}]);