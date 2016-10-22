angular.module('BlogApp').
	controller("NewBlogController", NewBlogController);

NewBlogController.$inject = ['$rootScope', 'NewBlogService', '$timeout', '$location'];

function NewBlogController($rootScope, NewBlogService, $timeout, $location){
	var vm = this;
	vm.postSuccess = null;
	vm.addPost = addPost;

	function addPost(){
		if(vm.blogTitle!="" && vm.blogTitle!=null)
		{
			NewBlogService.addBlogToGlobalList(vm.blogTitle, vm.blogComment)
				.then(function(response){
					vm.postSuccess="Successfully added the post";
					$timeout(function(){
						vm.postSuccess = null;
						$location.path('/');
					},1500);
				})
				.catch(function(err){
					$rootScope.errorMessage = "Error while adding the post."
				});
		}
		else{
			$rootScope.errorMessage = "Adding a blog title is mandatory."
		}
	}
}