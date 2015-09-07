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
  
