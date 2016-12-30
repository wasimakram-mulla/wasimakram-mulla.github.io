angular.module("Qeen")
	.controller("SignUpController", SignUpController);

SignUpController.$inject = ["UserService", "$location", "$rootScope", "$timeout"];

function SignUpController(UserService, $location, $rootScope, $timeout){
	var vm = this;
	vm.hasError = false;
	vm.loadingUsrnm = false;
	vm.key = aesjs.util.convertStringToBytes("Example128BitKey");
	vm.text = null;
	vm.textBytes = null;
	vm.aesCtr = null;
	vm.encryptedBytes = null;
	vm.UsrNmFound = null;
	vm.init = init;
	vm.checkUserNameAvail = checkUserNameAvail;
	vm.createAccount = createAccount;
	
	function init(){
	}

	function checkUserNameAvail(){
		if(vm.usernm){
			if(vm.usernm.length>3){
				vm.loadingUsrnm = true;
				vm.UsrNmFound = false;
				UserService.checkUserNameAvail(vm.usernm)
					.then(function(response){
						vm.loadingUsrnm = false;
						if(response.length>0){
							vm.UsrNmFound = true;
							vm.hasError = true;
						}
						else{
							vm.UsrNmFound = false;
							vm.hasError = false;
						}
					})
					.catch(function(err){
						vm.loadingUsrnm = false;
						console.log(err);
					});
			}
			else{
				vm.UsrNmFound = true;
			}
		}
	}
	
	function createAccount(){
		vm.text = vm.passwd;
		vm.textBytes = aesjs.util.convertStringToBytes(vm.text);
		vm.aesCtr = new aesjs.ModeOfOperation.ctr(vm.key, new aesjs.Counter(5));
		vm.encryptedBytes = vm.aesCtr.encrypt(vm.textBytes);
		var dt = new Date();
		var usrObj={
			usrNm: vm.usernm,
			usrFullNm: vm.userfullnm,
			passwd: JSON.stringify(vm.encryptedBytes),
			regDate: dt.getTime(),
			secQues: vm.securityQuestion,
			secAns: vm.securityAnswer,
		}
		UserService.createAccount(usrObj)
			.then(function(response){
				$location.path('/sign-in');
			})
			.catch(function(err){
				console.log(err);
			})
	}
	
	vm.init();
}