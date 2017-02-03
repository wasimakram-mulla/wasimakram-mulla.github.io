angular.module("GitBlog")
	.controller("AllBlogController", AllBlogController);

AllBlogController.$inject = ["$firebaseObject", "$firebaseArray","$firebaseAuth", "$rootScope", "PopUp", "$location", "UserService", "$timeout"];

function AllBlogController($firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, PopUp, $location, UserService, $timeout){
	var vm = this;
	vm.rootRefBlogLinks = null;
	vm.bloglinks = null;
	vm.isLoggedIn = false;
	vm.init = init;
	vm.loadBlogDets = loadBlogDets;
	
	function init(){
		vm.rootRefBlogLinks = firebase.database().ref().child('/blog-links');
		vm.bloglinks = $firebaseArray(vm.rootRefBlogLinks);
	};
	
	function loadBlogDets(blog){
		$location.path('/blog-details/'+blog.link);
	}

	
	vm.init();
};