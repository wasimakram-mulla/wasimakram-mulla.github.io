var mycart = angular.module('mycart', [
'ngRoute',
'ngResource'
]);

mycart.config(['$routeProvider','$resourceProvider',
  function($routeProvider,$resourceProvider) {
    $routeProvider.
      when('/views', {
        templateUrl: 'all-mobiles.html'
      }).
	  when('/details/:param', {
		templateUrl: 'mobiles-details.html'		
	  }).   
      otherwise({
        redirectTo: '/views'
      });
	  
}]);