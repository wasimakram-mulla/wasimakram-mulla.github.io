REValuator.directive('spinner', ['ServiceAPI', '$location', '$rootScope', function(ServiceAPI, $location, $rootScope) {
	return {
        template: '<h4 class="floatRight" ng-show="loadSpinner"><span class="text-primary">Please wait... <i class="fa fa-circle-o-notch fa-spin"></i></span> </h4>'
	};
}]);