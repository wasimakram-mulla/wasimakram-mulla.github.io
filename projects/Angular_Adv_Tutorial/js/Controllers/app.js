var CoreStructure = angular.module('Structure', [
'ngRoute',
'pascalprecht.translate',
'ngGrid'
]);

CoreStructure.config(['$routeProvider','$translateProvider',
  function($routeProvider,$translateProvider) {
    $routeProvider.
      when('/whyangular', {
        templateUrl: 'views/whyangular.html',
        controller: 'BasicController'
      }).
      when('/TwoWayDB_Filter', {
        templateUrl: 'views/twowaydb_filter.html',
        controller: 'BasicController'
      }).
      when('/Localization', {
        templateUrl: 'views/localization.html',
        controller: 'BasicController'
      }).
      when('/ng_grid', {
        templateUrl: 'views/ng_grid.html',
        controller: 'BasicController'
      }).
      when('/custom_service', {
        templateUrl: 'views/custom_service.html',
        controller: 'BasicController'
      }).
      when('/custom_directive', {
        templateUrl: 'views/custom_directive.html',
        controller: 'BasicController'
      }).
      when('/what_is_Angular', {
        templateUrl: 'views/what_is_Angular.html',
        controller: 'BasicController'
      }).
      otherwise({
        redirectTo: '/whyangular'
      });
	  
		$translateProvider.preferredLanguage('en');
		$translateProvider.translations('en', {
			'MESSAGE': 'This is an Angular Tutorial.'
		}).translations('de', {
			'MESSAGE': 'Dies ist ein Winkel Tutorial.'
		});
}]);
  
