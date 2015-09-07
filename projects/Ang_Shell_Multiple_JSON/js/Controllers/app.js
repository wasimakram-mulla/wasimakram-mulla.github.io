var CoreStructure = angular.module('Structure', [
'ngRoute',
'ngResource'
]);

CoreStructure.config(['$routeProvider','$resourceProvider',
  function($routeProvider,$resourceProvider) {
    $routeProvider.
      when('/loadJSON', {
        templateUrl: 'views/LoadJSON.html',
        controller: 'BasicController'
      }).
      when('/demoPage1', {
        templateUrl: 'views/LoadJSON.html',
        controller: 'BasicController'
      }).
      when('/demoPage2', {
        templateUrl: 'views/LoadJSON.html',
        controller: 'BasicController'
      }).
      otherwise({
        redirectTo: '/loadJSON'
      });
	  
}]);
  
