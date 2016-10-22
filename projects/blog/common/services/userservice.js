angular.module('BlogApp').
	service("UserService", UserService);

UserService.$inject = ["$q", "$http", "DataService"];

function UserService($q, $http, DataService){
	var vm = this;
	vm.userdata = null;
	vm.globalBlogs = null;
	vm.getAllUsers = getAllUsers;
	vm.fetchBlogCommentUsers = fetchBlogCommentUsers;
	vm.fetchBlogUser = fetchBlogUser;
	vm.removeIdenticalUsers = removeIdenticalUsers;

	function getAllUsers(){
	  return $q(function(resolve, reject) {
		$http({
		  method: 'GET',
		  url: './common/data/users.json'
		}).then(function successCallback(response) {
			resolve(response);
		}, function errorCallback(err) {
			reject(err);
		});//$http finish
	  });//$q finish
	};

	function fetchBlogCommentUsers(cmtData, filter){
		vm.userdata = DataService.getUsers();
		var tmpUserDetArray = new Array();
		return $q(function(resolve, reject) {
			if(vm.userdata){
				var tmpUsrArr;
				if(filter == "FilteredData"){
					tmpUsrArr = vm.removeIdenticalUsers(cmtData);
				}
				else{
					tmpUsrArr = cmtData;
				}
				for(var i=0; i< tmpUsrArr.length; i++){
					for(j=0; j< vm.userdata.length; j++){
						if(tmpUsrArr[i].commentedBy == vm.userdata[j].userId){
							tmpUserDetArray.push(vm.userdata[j]);
							break;
						}
					}
				}
				resolve(tmpUserDetArray);
			}
			else{
				reject(404);
			}
		});
	}

	function removeIdenticalUsers(cmtData){
		for(var i=0; i<cmtData.length; i++){
			for(var j=i+1; j<cmtData.length; j++){
				if(cmtData[i].commentedBy == cmtData[j].commentedBy){
					cmtData.splice(j,1);
					j=j-1;
				}
			}
		}
		return(cmtData)
	}
	
	function fetchBlogUser(queId){
		vm.userdata = DataService.getUsers();
		vm.globalBlogs = DataService.getBlogs();
		var postedBy = null;
		var userDetails = null;
		for(var i=0; i<vm.globalBlogs.length; i++){
			if(queId == vm.globalBlogs[i].queId){
				postedBy = vm.globalBlogs[i].postedBy;
				break;
			}
		}
		
		
		for(var j=0; j<vm.userdata.length; j++){
			if(postedBy == vm.userdata[j].userId){
				userDetails = vm.userdata[j];
				break;
			}
		}
		
		return userDetails;
	}
}