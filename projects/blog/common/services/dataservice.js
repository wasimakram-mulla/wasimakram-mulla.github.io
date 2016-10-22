angular.module('BlogApp').
	service("DataService", DataService);
	
DataService.$inject = ["$rootScope"];

function DataService($rootScope){
	var vm = this;
	vm.globalBlogs = null;
	vm.allUsers = null;
	vm.queId = null;
	$rootScope.loggedInUser = null;
	$rootScope.loggedIn = false;
	vm.getBlogs = getBlogs;
	vm.setBlogs = setBlogs;
	vm.getUsers = getUsers;
	vm.setUsers = setUsers;
	vm.getLoginUser = getLoginUser;
	vm.setLoginUser = setLoginUser;
	vm.getBlogQuestionId = getBlogQuestionId;
	vm.setBlogQuestionId = setBlogQuestionId;

	function getBlogs(){
		return vm.globalBlogs
	};

	function setBlogs(blogData){
		vm.globalBlogs = blogData;
		return true;
	};

	function getUsers(){
		return vm.allUsers;
	};

	function setUsers(users){
		vm.allUsers = users;
	};

	function getBlogQuestionId(){
		return vm.queId;
	};

	function setBlogQuestionId(queId){
		vm.queId = queId;
	};

	function getLoginUser(){
		return {
			"loggedInUser" : $rootScope.loggedInUser,
			"loggedIn" : $rootScope.loggedIn
		};
	};

	function setLoginUser(user, status){
		$rootScope.loggedInUser = user;
		$rootScope.loggedIn = status;
	};
}