var portfolio = angular.module('portfolio', [
'ngRoute',
'ngResource'
]);

portfolio.config(['$routeProvider','$resourceProvider',
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
        templateUrl: 'views/projects.html'
      }).
      when('/contact', {
        templateUrl: 'views/contact.html'
      }).
      otherwise({
        redirectTo: '/profile'
      });
}]);

portfolio.controller("HomeController", function($scope){
	var sdt = new Date('1989-08-09');
	var difdt = new Date(new Date() - sdt);
	$scope.age=(difdt.toISOString().slice(0, 4) - 1970) + " Years, " + (difdt.getMonth()+1) + " Months, " + difdt.getDate() + " Days";
});
