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
	  when('/addOrder', {
        templateUrl: 'views/addOrder.html'
      }).
	  when('/viewOrder', {
        templateUrl: 'views/viewOrder.html'
      }).
	  when('/dispDoneOrder', {
        templateUrl: 'views/dispDoneOrder.html'
      }).
      otherwise({
        redirectTo: '/#'
      });
	  
}]);
  
