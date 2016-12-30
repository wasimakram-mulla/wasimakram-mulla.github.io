angular.module("Qeen")
	.controller("SignInController", SignInController);

SignInController.$inject = ["UserService", "$location", "$rootScope", "$timeout"];

function SignInController(UserService, $location, $rootScope, $timeout){
	var vm = this;
	vm.prevPath = null;
	vm.popupEnterUsernmPane = true;
	vm.popupSecQuesPane = false;
	vm.popupPasswdPane = false;
	vm.forgetPasswordPopupFlag = false;
	vm.showPassword = false;
	vm.key = aesjs.util.convertStringToBytes("Example128BitKey");
	vm.text = null;
	vm.textBytes = null;
	vm.aesCtr = null;
	vm.encryptedBytes = null;
	vm.decryptedBytes = null;
	vm.secQue = null;
	vm.secAns = null;
	vm.init = init;
	vm.signIn = signIn;
	vm.closePopup = closePopup;
	vm.popupShowSecQuesPane = popupShowSecQuesPane;
	vm.popupGetPassword = popupGetPassword;
	vm.showForgetPopUp = showForgetPopUp;

	function init(){
		if($rootScope.previousPath)
		{
			vm.prevPath = $rootScope.previousPath;
			$rootScope.previousPath = null;
		}
	}

	function signIn(){
		vm.key = aesjs.util.convertStringToBytes("Example128BitKey");
		vm.text = vm.passwd;
		vm.textBytes = aesjs.util.convertStringToBytes(vm.text);
		vm.aesCtr = new aesjs.ModeOfOperation.ctr(vm.key, new aesjs.Counter(5));
		vm.encryptedBytes = vm.aesCtr.encrypt(vm.textBytes);
		vm.passwd = JSON.stringify(vm.encryptedBytes)

		UserService.checkLogin(vm.usernm, JSON.stringify(vm.encryptedBytes))
			.then(function(response){
				var tmpUserDets = {
					id: response.id,
					userId: response.userId,
					fullNm: response.userFullName,
					userAvatar: response.userAvatar
				}
				sessionStorage.setItem("userdets", JSON.stringify(tmpUserDets));
				$rootScope.userdets = tmpUserDets;
				$timeout(function() {
					$rootScope.successMessage = "Welcome <em class='text-info'>" +response.userFullName + "</em> we are glad you're back.";
				},2000);
				$timeout(function() {
					$rootScope.successMessage = null;
				},4000);
				tmpUserDets = null;
				vm.key = null;
				vm.text = null;
				vm.textBytes = null;
				vm.aesCtr = null;
				vm.encryptedBytes = null;
				if(vm.prevPath != null){
					$location.path(vm.prevPath);
				}
				else{
					$location.path('/');
				}
			})
			.catch(function(error){
				console.log(error);
				vm.passwd = null;
			})
	}

	function closePopup(){
		vm.popupEnterUsernmPane = true;
		vm.popupSecQuesPane = false;
		vm.popupPasswdPane = false;
		vm.secQue = null;
		vm.secAns = null;
		vm.forgetPasswordPopupFlag = false;
	}

	function popupShowSecQuesPane(){
		vm.popupEnterUsernmPane = false;
		UserService.fetchSecurityQuestion(vm.FPusername)
			.then(function(response){
				if(response!=undefined){
					vm.popupSecQuesPane = true;
					vm.secQue = response.securityQuestion;
				}
				else{
					$rootScope.errorMessage="Invalid Username entered";
					$timeout(function(){
						$rootScope.errorMessage = null;
					},1500);
					vm.popupEnterUsernmPane = true;
				}
			})
			.catch(function(err){
				console.log(err)
			});
	}

	function popupGetPassword(){
		vm.popupSecQuesPane = false;
		UserService.fetchPassword(vm.FPusername,vm.FPsecAnswer)
			.then(function(response){
				if(response!=undefined){
					vm.popupPasswdPane = true;
					vm.aesCtr = new aesjs.ModeOfOperation.ctr(vm.key, new aesjs.Counter(5));
					vm.decryptedBytes = vm.aesCtr.decrypt(JSON.parse(response.password));
					var decryptedText = aesjs.util.convertBytesToString(vm.decryptedBytes);
					vm.secAns = decryptedText;
					vm.decryptedBytes = null;
					decryptedText = null;
				}
				else{
					$rootScope.errorMessage="Kindly check your answer.";
					$timeout(function(){
						$rootScope.errorMessage = null;
					},1500);
					vm.FPsecAnswer = null;
					vm.popupSecQuesPane = true;
				}
			})
			.catch(function(err){
				console.log(err);
			})
	}

	function showForgetPopUp(){
		vm.forgetPasswordPopupFlag = true;
	}
	vm.init();
}