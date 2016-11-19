angular.module('portfolio')
	.service("ProjectsService", ProjectsService);

ProjectsService.$inject = ["$q", "$http"];

function ProjectsService($q, $http){
	var vm = this;
	vm.getProjects = getProjects;
	
	function getProjects(){
		return $q(function(resolve, reject) {
			$http({
			  method: 'GET',
			  url: './data/projects.json'
			}).then(function successCallback(response) {
				resolve(response);
			}, function errorCallback(error) {
				reject("Your firewall blocks showing the projects.");
			});
		});
	};
}