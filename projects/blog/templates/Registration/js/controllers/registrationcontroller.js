angular.module('BlogApp').
	controller("RegistrationController", RegistrationController);

RegistrationController.$inject = ['$rootScope', '$timeout', '$location', 'DataService', 'UserService'];

function RegistrationController($rootScope, $timeout, $location, DataService, UserService){
	var vm = this;
	vm.txtError = null;
	vm.txtSuccess = null;
	vm.userNmFlag = false;
	vm.allUsers = null;
	vm.usernmError = null;
	vm.signup = signup;
	vm.checkUserNmAvail = checkUserNmAvail;
	vm.resetForm = resetForm;

	UserService.getAllUsers()
		.then(function(response){
			vm.allUsers = response.data.users;			
		})
		.catch(function(err){
			$rootScope.errorMessage = "Cannot load users";
	});

	function signup(){
		if(vm.username!="" && vm.username!=null && vm.username!=undefined){
			if(vm.password!="" && vm.password!=null && vm.password!=undefined && vm.confpassword!="" && vm.confpassword!=null && vm.confpassword!=undefined){
				if(vm.fullname!="" && vm.fullname!=null && vm.fullname!=undefined){
					if(vm.password == vm.confpassword)
					{
						if(vm.userNmFlag == true){
							var tmpUser = {
								"userId": (vm.allUsers.length + 1),
								"userNm": vm.username,
								"fullNm": vm.fullname,
								"password":vm.password
							};
							vm.allUsers.push(tmpUser);
							DataService.setUsers(vm.allUsers);
							vm.txtError = null;
							vm.txtSuccess = "User added successfully";
							vm.resetForm();
						}
						else{
							vm.txtError = "Username already taken, please choose another username";
						}
					}
					else{
						vm.txtError = "Passwords does not match.";
					}
				}
				else{
					vm.txtError = "Full name must be entered.";
				}
			}
			else{
				vm.txtError = "Password fields cannot be empty.";
			}
		}
		else{
			vm.txtError = "Username field cannot be empty.";
		}
		$timeout(function(){
			vm.txtError = null;
			vm.txtSuccess = null;
		},1500);
	};
	
	function checkUserNmAvail(){		
		var tmpFlag = false;
		for(var i=0; i<vm.allUsers.length; i++){
			if(vm.allUsers[i].userNm == vm.username)
			{
				tmpFlag = true;
				break;
			}
		}
		
		if(tmpFlag == true)
		{
			vm.userNmFlag = false;
			vm.usernmError = "Username not available.";
		}
		else{
			vm.userNmFlag = true;
			vm.usernmError = null;
		}
	}
	
	function resetForm(){
		vm.username = null; 
		vm.fullname = null;
		vm.password = null;
		vm.confpassword = null;
	}
}