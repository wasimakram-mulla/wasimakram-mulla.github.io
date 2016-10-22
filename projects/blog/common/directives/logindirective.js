angular.module('BlogApp').
	directive("loginDirective", loginDirective);


function loginDirective(){
	var controller = ['$scope', '$rootScope', 'DataService', '$location' , function ($scope, $rootScope, DataService, $location) {
		$scope.checkLogin = function () {
			var tmpUsrs = DataService.getUsers();
			var loginFlag = false;
			var index = -1;
			for(var i=0; i<tmpUsrs.length; i++)
			{
				if(tmpUsrs[i].userNm == $scope.usernm && tmpUsrs[i].password == $scope.passwd){
					loginFlag = true;
					index=i;
					break;
				}
			}

			if(loginFlag == true){
				DataService.setLoginUser(tmpUsrs[index], true);
				$rootScope.showLoginModal = false;
				tmpUsrs = null;
				if($location.path() == '/reguser'){
					$location.path('/');
				}
			}
			else{
				DataService.setLoginUser(null, false);
				alert("Please check your credentials.")
			}
		};

		$scope.closeModal = function () {
			$rootScope.showLoginModal = false;
		};

		$scope.availableUsrPwds = function () {
			$rootScope.showLoginModal = false;
			$rootScope.usersdetailsModal = true;
		};

		$scope.loginOnEnter = function (evt) {
			if(evt.keyCode == 13) //on enter click
			{
				$scope.checkLogin();
			}
		};
      }],

      template = '<div class="col-md-4"></div><div class="col-md-4"><div class="login-panel"><div class="login-panel-header"><i class="fa fa-sign-in"></i> Sign in</div><div class="login-panel-body"><input type="text" ng-model="usernm" class="form-control" placeholder="Username" /><br/><input type="password" ng-model="passwd" class="form-control" placeholder="Password" ng-keyup="loginOnEnter($event)"/></div><div class="login-panel-footer"><a href="javascript:void()" ng-click="availableUsrPwds()">Available usernames passwords</a><button class="btn btn-sm btn-primary" ng-click="checkLogin()" ng-disabled="!usernm || !passwd">Sign in</button><button class="btn btn-sm btn-default" ng-click="closeModal()">Cancel</button></div></div></div>';

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