angular.module('BlogApp').
	service("NewBlogService", NewBlogService);

NewBlogService.$inject = ['DataService', '$rootScope', '$q'];

function NewBlogService(DataService, $rootScope, $q){
	var vm = this;
	vm.globalBlogData = null;
	vm.getLoginUser = null;
	vm.addBlogToGlobalList = addBlogToGlobalList;


	function addBlogToGlobalList(blogTitle, blogComment){
		return $q(function(resolve, reject) {
			vm.globalBlogData = DataService.getBlogs();
			var tmpUsr = DataService.getLoginUser();
			vm.getLoginUser = tmpUsr.loggedInUser;			
			if(blogComment == "" || blogComment == null || blogComment == undefined)
			{
				var tmpData={
					"queId": (vm.globalBlogData.length + 1),
					"queText": blogTitle,
					"postedBy": vm.getLoginUser.userId,
					"commentData":[]
				}
			}
			else{
				var dt = new Date();				
				var tmpData={
					"queId": (vm.globalBlogData.length + 1),
					"queText": blogTitle,
					"postedBy": vm.getLoginUser.userId,
					"commentData":[{
						"commentId":dt.getTime(),
						"commentedBy":vm.getLoginUser.userId,
						"commentText":blogComment
					}]
				}				
			}
			vm.globalBlogData.push(tmpData);
			if(DataService.setBlogs(vm.globalBlogData))
			{
				resolve(201);
			}
			else{
				reject(400)
			}
			tmpData = null;
			dt = null;
			
				/*reject || resolve*/			
		});//$q finish
	}
}