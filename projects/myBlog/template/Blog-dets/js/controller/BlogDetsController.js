angular.module("GitBlog")
	.controller("BlogDetsController", BlogDetsController);

BlogDetsController.$inject = ["$firebaseObject", "$firebaseArray", "$rootScope", "PopUp", "$location", "UserService", "$timeout", "$routeParams"];

function BlogDetsController($firebaseObject, $firebaseArray, $rootScope, PopUp, $location, UserService, $timeout, $routeParams){
	var vm = this;
	vm.rootRef = null;
	vm.blogdata = null;
	vm.init = init;
	vm.goToAllBlogs = goToAllBlogs;
	
	function init(){
		console.log("BlogDetsController", $routeParams.blogId);
		vm.rootRef = firebase.database().ref().child('/blog-post').orderByChild('bloglink').equalTo($routeParams.blogId);
		vm.blogdata = $firebaseArray(vm.rootRef);
		console.log(vm.blogdata);
	}
	
	function goToAllBlogs(){
		$location.path('/allblog');
	}
	
	vm.init();
}