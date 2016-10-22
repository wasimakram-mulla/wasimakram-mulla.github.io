angular.module('BlogApp').
	controller("AllBlogsController", AllBlogsController);

AllBlogsController.$inject = ["DataService", "$timeout", "AllBlogService", "UserService", "$rootScope", "$location"];

function AllBlogsController(DataService, $timeout, AllBlogService, UserService, $rootScope, $location){
	var vm = this;
	vm.blogQues = null;
	vm.users = null;
	vm.errorMessage = null;
	vm.getData = getData;
	vm.loadBlog = loadBlog;
	vm.getBlogUsers = getBlogUsers;
	vm.loadDataFn = loadDataFn;

	vm.users = DataService.getUsers();
	function getData(){
		var tmpData = DataService.getBlogs();
		if(tmpData){
			vm.blogQues = tmpData;
		}else{
			AllBlogService.getData()
			.then(function(response){
				vm.blogQues = response.data.blogques;
				DataService.setBlogs(response.data.blogques);
			})
			.catch(function(error){
				$rootScope.errorMessage = "Cannot load blogs."
			});


			if(!vm.users)
			{
				UserService.getAllUsers()
				.then(function(response){
					vm.users = response.data.users;
					DataService.setUsers(response.data.users);
				})
				.catch(function(error){
					$rootScope.errorMessage = "Cannot load Users."
				});
			}
		}
		tmpData = null;
	};

	function getBlogUsers(){
		for(var i=0; i<vm.blogQues.length; i++)
		{
			(function(e){
				vm.blogQues[i].postedUser = UserService.fetchBlogUser(vm.blogQues[i].queId);
			})(i);
		}
	}

	function loadDataFn(){
		$timeout(function(){
			if(!vm.blogQues || !vm.users)
			{
				loadDataFn();
			}
			else{
				vm.getBlogUsers();
			}
		},1500);
	}
	function loadBlog(queId){
		DataService.setBlogQuestionId(queId);
		$location.path("/blogDetails");
	}
	vm.getData();
	vm.loadDataFn();
}