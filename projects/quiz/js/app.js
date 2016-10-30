var quiz=angular.module("Quiz", ['ngRoute']);

quiz.run(function($location){
	$location.path('quiz');
});

quiz.config(function($routeProvider, $locationProvider) {
  $routeProvider
	.when('/quiz', {
		templateUrl: 'views/quiz.html'
	})
	.when('/results', {
		templateUrl: 'views/results.html'
	})
	.otherwise({
		redirectTo: '/quiz'
	});	
});