angular.module('portfolio', [
'ngRoute',
'ngResource',
'ngSanitize'
]);

angular.module('portfolio').config(['$routeProvider','$resourceProvider',
  function($routeProvider,$resourceProvider) {
    $routeProvider.
      when('/profile', {
        templateUrl: 'views/profile.html'
      }).
      when('/experience', {
        templateUrl: 'views/experience.html'
      }).
      when('/abilities', {
        templateUrl: 'views/abilities.html'
      }).
      when('/projects', {
        templateUrl: 'views/projects.html',
		controller:'ProjectsController',
		controllerAs:'PrjCtrl'
      }).
      when('/contact', {
        templateUrl: 'views/contact.html'
      }).
      otherwise({
        redirectTo: '/profile'
      });
}]);

angular.module('portfolio').controller("HomeController", function($scope){
	var sdt = new Date('1989-08-09');
	var difdt = new Date(new Date() - sdt);
	$scope.age=(difdt.toISOString().slice(0, 4) - 1970) + " Years, " + (difdt.getMonth()+1) + " Months, " + difdt.getDate() + " Days";
});
