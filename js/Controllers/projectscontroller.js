angular.module('portfolio')
	.controller("ProjectsController", ProjectsController);

ProjectsController.$inject = ["ProjectsService"];
	
function ProjectsController(ProjectsService){
	var vm = this;
	vm.projectsDets = null;
	vm.init = init;
	vm.loader = true;
	
	function init(){
		ProjectsService.getProjects()
			.then(function(response){
				vm.loader = false;
				vm.projectsDets = response.data.projects;
			})
			.catch(function(error){
				alert(error);
			});
	}
	
	vm.init();
}