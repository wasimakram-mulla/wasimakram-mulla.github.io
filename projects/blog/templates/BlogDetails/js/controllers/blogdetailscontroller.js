angular.module('BlogApp').
	controller("BlogDetailsController", BlogDetailsController);

BlogDetailsController.$inject = ["DataService", "UserService", "$location", "$rootScope"];

function BlogDetailsController(DataService, UserService, $location, $rootScope){
	var vm = this;
	vm.blogData = null;
	vm.quesText = null;
	vm.commentData = null;
	vm.quesId = null;
	vm.userData = null;
	vm.loggedInUser = null;
	vm.sortData = sortData;
	vm.alterCommentData = alterCommentData;
	vm.getBlogUsers = getBlogUsers;
	vm.goToDashboard = goToDashboard;
	vm.addComment = addComment;
	vm.deleteComment = deleteComment;
	vm.editComment = editComment;
	var tmpUsr = DataService.getLoginUser();
	vm.loggedInUser = tmpUsr.loggedInUser;

	var tmpData = DataService.getBlogs();
	if(tmpData){
		vm.blogData = tmpData;
		vm.sortData();
	}
	else{
		$location.path("/")
	}

	function sortData(){
		vm.quesId = DataService.getBlogQuestionId();
		vm.blogUsr = UserService.fetchBlogUser(vm.quesId);
		for(var i=0; i<vm.blogData.length; i++){
			if(vm.quesId == vm.blogData[i].queId)
			{
				vm.quesText = vm.blogData[i].queText;
				vm.commentData = vm.blogData[i].commentData;
				break;
			}
		}
		vm.alterCommentData();
		vm.getBlogUsers();
	}

	function getBlogUsers(){
		var tmpCmtDataNew = angular.copy(vm.commentData);
		UserService.fetchBlogCommentUsers(tmpCmtDataNew, "FilteredData")
			.then(function(response){
				vm.userData = response;
			})
			.catch(function(err){
				$rootScope.errorMessage = "Cannot load users of this post."
			});
		tmpCmtDataNew = null;
	}

	function alterCommentData(){
		var tmpCmtDataNonFltr = angular.copy(vm.commentData);
		UserService.fetchBlogCommentUsers(tmpCmtDataNonFltr, "NonFilteredData")
			.then(function(response){
				for(var i=0; i<response.length;i++){
					vm.commentData[i].userDets = response[i];
				}
			})
			.catch(function(err){
				$rootScope.errorMessage = "Cannot load users and comments of this post."
			});
		tmpCmtDataNonFltr = null;
	}

	function goToDashboard(){
		$location.path("/");
	}

	function addComment(){
		var index = -1;
		var tmpUsr = DataService.getLoginUser();
		vm.loggedInUser = tmpUsr.loggedInUser;
		tmpUsr = null;
		for(var i=0; i<vm.blogData.length; i++){
			if(vm.blogData[i].queId == vm.quesId){
				index=i;
				break;
			}
		}
		var dt = new Date();
		var newCmntObj = {
			"commentId": dt.getTime(),
			"commentedBy": vm.loggedInUser.userId,
			"commentText": vm.commentVal
		};
		dt= null;
		if(index!=-1){
			vm.blogData[index].commentData.push(newCmntObj);
			newCmntObj=null;
			DataService.setBlogs(vm.blogData);
			vm.sortData();
			vm.commentVal = null;
		}else{
			$rootScope.errorMessage = "Error while adding comment."
		}
	};

	function deleteComment(cmnt){
		var index = -1;
		for(var i=0; i<vm.blogData.length; i++){
			if(vm.blogData[i].queId == vm.quesId){
				index=i;
				break;
			}
		}

		for(var j=0; j<vm.blogData[index].commentData.length; j++)
		{
			if(vm.blogData[index].commentData[j].commentId == cmnt.commentId)
			{
				var confirmFlag = confirm("Are you sure you want delete this comment?");
				if(confirmFlag == true){
					vm.blogData[index].commentData.splice(j,1);
					vm.sortData();
					break;
				}
				else{
					break;
				}
			}
		}
	}

	$rootScope.$watch('loggedInUser', function(newValue, oldValue) {
		var tmpUsr = DataService.getLoginUser();
		vm.loggedInUser = tmpUsr.loggedInUser;
	});

	function editComment(cmnt){
		vm.quesId = DataService.getBlogQuestionId();
		var tmpBlog = {
			"postId": vm.quesId,
			"cmtData": cmnt
		}
		$rootScope.editCommentModal = tmpBlog;
		tmpBlog = null
	}

	tmpData = null;
	tmpUsr = null;
}