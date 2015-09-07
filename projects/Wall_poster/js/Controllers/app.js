var CoreStructure = angular.module('Structure', [
'ngRoute',
'ngResource'
]);

CoreStructure.config(['$routeProvider','$resourceProvider',
  function($routeProvider,$resourceProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: 'views/dashboard.html'
      })
	  .when('/#', {
        templateUrl: 'views/dashboard.html'
      }).
	  when('/showHall', {
        templateUrl: 'views/viewHall.html'
      })
	  .
      otherwise({
        redirectTo: '/#'
      });
	  
}]);
  
