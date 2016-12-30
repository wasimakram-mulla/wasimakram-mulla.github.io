angular.module("Qeen")
	.service("TagsService", TagsService);

TagsService.$inject = ["$http", "Backand", "$q", "$rootScope", "$timeout"];

function TagsService($http, Backand, $q, $rootScope, $timeout){
	var vm = this;
	vm.getAllTags = getAllTags;
	vm.removeQuestionTags = removeQuestionTags;
	vm.getAllTagWithQuestions = getAllTagWithQuestions;

	function getAllTags(){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$rootScope.loadMessage = "loading tags.";
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/objects/languageTags'
			}).then(function successCallback(response) {
				resolve(response.data.data);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			});//$http finish
		});//$q finish
	};

	function getAllTagWithQuestions(){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$rootScope.loadMessage = "loading tags.";
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/ques_tags'
			}).then(function successCallback(response) {
				resolve(response.data);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			}, function errorCallback(err) {
				reject(err);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			});//$http finish
		});//$q finish
	};
	
	function removeQuestionTags(queId){
		return $q(function(resolve, reject) {
			$rootScope.loader = true;
			$rootScope.loadMessage = "Removing Tags.";
			$http({
				method: 'GET',
				url: Backand.getApiUrl() + '/1/query/data/delete_ques_tags',
				params: {
					parameters: {
						queId: queId
					}
				}
			}).then(function successCallback(response) {
				resolve(response.data);
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
			}, function errorCallback(err) {
				$rootScope.loader = null;
				$rootScope.loadMessage = null;
				reject(err);
			});//$http finish
		});//$q finish
	};
};