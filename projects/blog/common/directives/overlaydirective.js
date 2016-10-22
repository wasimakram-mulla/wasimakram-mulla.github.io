angular.module('BlogApp').
	directive("overlayDirective", overlayDirective);


function overlayDirective(){
	var controller = ['$scope', '$rootScope' , function ($scope, $rootScope) {
		$scope.errMessage = $rootScope.errorMessage;
		function init() {
			$scope.items = angular.copy($scope.datasource);
		}

		init();

		$scope.closeModal = function () {             
			$rootScope.errorMessage = null;
		};
      }],
        
      template = '<div class="col-md-4"></div><div class="col-md-4"><div class="error-panel"><div class="error-panel-header"><i class="fa fa-exclamation-triangle"></i> Error !!!</div><div class="error-panel-body">{{errMessage}}</div><div class="error-panel-footer"><button class="btn btn-sm btn-default" ng-click="closeModal()">Ok</button></div></div></div>';
      
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