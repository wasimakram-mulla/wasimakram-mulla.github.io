angular.module('BlogApp').
	directive("usersDirective", usersDirective);


function usersDirective(){
	var controller = ['$scope', '$rootScope', 'DataService', '$location' , function ($scope, $rootScope, DataService, $location) {
		
		$scope.closeModal = function () {
			$rootScope.usersdetailsModal = false;
		};
		$scope.goBackToLogin = function () {
			$rootScope.usersdetailsModal = false;
			$rootScope.showLoginModal = true;
		};
		
      }],

      template = '<div class="col-md-4"></div><div class="col-md-4"><div class="users-panel"><div class="users-panel-header"><i class="fa fa-users"></i> Available User names and passwords</div><div class="users-panel-body"><table class="table table-striped"><tr><th>Username</th><th>Full Nam</th><th>Password</th></tr><tr><td>wasim</td><td>Wasimakram Mulla</td><td>wasim</td></tr><tr><td>test</td><td>Test Test</td><td>test</td></tr><tr><td>demo</td><td>Demo Demo</td><td>demo</td></tr><tr><td>abcd</td><td>Abc Xyz</td><td>abcd</td></tr><tr><td>admin</td><td>Admin</td><td>admin</td></tr></table></div><div class="users-panel-footer"><button class="btn btn-sm btn-warning" ng-click="goBackToLogin()">Back</button><button class="btn btn-sm btn-default" ng-click="closeModal()">Cancel</button></div></div></div>';

	return {
		restrict: 'EA', //Default in 1.3+
		scope: {
			datasource: '=',
			add: '&',
		},
		controller: controller,
		template: template
	};
}