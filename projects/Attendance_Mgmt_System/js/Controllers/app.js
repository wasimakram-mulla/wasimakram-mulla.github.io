var EmpLogin = angular.module('EmployeeLogin', [
'ngRoute',
'ngResource'
]);

EmpLogin.run(function($rootScope, $http, $templateCache) {
	$(".loaderContainer").show();
    $rootScope.showMenus = false;
    $rootScope.userDetails = {};
	$rootScope.barCodeDigits;
	$rootScope.adminAccess;
	$rootScope.serverTime;
	if(localStorage.userDetails){
		$rootScope.userDetails = JSON.parse(localStorage.userDetails);
		$rootScope.adminAccess=$rootScope.userDetails.role;		
	}
	$rootScope.updtVariables= function(){
		if(localStorage.userDetails){
			alert('All the Database calls are blocked for Security reasons... Thanks.');
		}
		else{
			$(".loaderContainer").hide();
		}
	}
	$rootScope.updtVariables();
})  

EmpLogin.config(['$routeProvider','$httpProvider','$resourceProvider','$locationProvider',
  function($routeProvider,$httpProvider,$resourceProvider, $locationProvider) {
	  
	$httpProvider.interceptors.push(function($q, $location,$injector, $rootScope) { //intercept each response if 401 - unauthorised or 403- forbidden redirect user to login page.
        return {
			'request': function(config) {
				if(!localStorage.userDetails){
					$rootScope.showMenus=false;
					$location.path("/login");
				}else{
					$rootScope.showMenus=true;
					$rootScope.userDetails = JSON.parse(localStorage.userDetails);					
				}
				return config;
			}
        };
    });
	
    $routeProvider.
	  when('/#', {
        templateUrl: 'views/punchIn.html',
		controller: 'AdminUserRedirectController'
      }).
	  when('/login', {
        templateUrl: 'views/login.html'
      }).
	  when('/punch', {
        templateUrl: 'views/punchIn.html'
      }).
	  when('/attendanceAll', {
        templateUrl: 'views/attendanceall.html'
      }).
	  when('/attendance', {
        templateUrl: 'views/attendance.html'
      }).
	  when('/addemployee', {
        templateUrl: 'views/addemployee.html'
      }).
	  when('/barcode/:param', {
		templateUrl: 'views/showBarCode.html'		
	  }).
	  when('/chngpass', {
		templateUrl: 'views/chngPass.html'		
	  }).
      otherwise({
        redirectTo: '/#'		
      });
	  
}]);

