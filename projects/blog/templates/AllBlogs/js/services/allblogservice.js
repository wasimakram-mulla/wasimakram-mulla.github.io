angular.module('BlogApp').
	service("AllBlogService", AllBlogService);

AllBlogService.$inject = ["$q", "$http"];

function AllBlogService($q, $http){
	var vm = this;
	vm.getData = getData;

	function getData(){
	  return $q(function(resolve, reject) {
		$http({
		  method: 'GET',
		  url: './common/data/allblog.json'
		}).then(function successCallback(response) {
			resolve(response);
		}, function errorCallback(err) {
			reject(err);
		});//$http finish
	  });//$q finish
	};
}