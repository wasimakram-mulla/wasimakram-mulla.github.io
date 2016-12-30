angular.module("Qeen")
	.controller("ChangePasswordController", ChangePasswordController);

ChangePasswordController.$inject = ["UserService", "$rootScope", "$timeout", "$location"];

function ChangePasswordController(UserService, $rootScope, $timeout, $location){
	var vm = this;
    vm.errorPass = null;
    vm.init = init;
	vm.key = aesjs.util.convertStringToBytes("Example128BitKey");
	vm.text = null;
	vm.textBytes = null;
	vm.aesCtr = null;
	vm.encryptedBytes = null;
    vm.changePassword = changePassword;
    vm.checkCurrPass = checkCurrPass;
    vm.checkNewConfirmPass = checkNewConfirmPass;

	function init(){
		if(!sessionStorage.getItem("userdets")){
			$location.path('/sign-in');
		}
		else{
			vm.userId = $rootScope.userdets.userId;
		}
	}

    function changePassword(){
        if(vm.currPass == vm.newPass){
            $rootScope.errorMessage = "Current password and new password cannot be same.";
            $timeout(function(){
                $rootScope.errorMessage = null;
            },2000);
        }
        else{
			vm.text = vm.newPass;
			vm.textBytes = aesjs.util.convertStringToBytes(vm.text);
			vm.aesCtr = new aesjs.ModeOfOperation.ctr(vm.key, new aesjs.Counter(5));
			vm.encryptedBytes = vm.aesCtr.encrypt(vm.textBytes);
            UserService.changePassword(JSON.stringify(vm.encryptedBytes), vm.userId)
                .then(function(response){
                    $rootScope.successMessage = "Password changed successfully.";
                    $location.path('/');
                    $timeout(function(){
                        $rootScope.successMessage = null;
                    },2000);
                })
                .catch(function(error){
                    console.log(error);
                })
        }
    };

    function checkCurrPass(){
		vm.text = vm.currPass;
		vm.textBytes = aesjs.util.convertStringToBytes(vm.text);
		vm.aesCtr = new aesjs.ModeOfOperation.ctr(vm.key, new aesjs.Counter(5));
		vm.encryptedBytes = vm.aesCtr.encrypt(vm.textBytes);
        UserService.getUserPass(vm.userId, JSON.stringify(vm.encryptedBytes))
            .then(function(response){
                if(response.length <= 0){
                    vm.errorMessage = "Current password mismatch.";
                    vm.errorPass = true;
                }
                else{
                    vm.errorMessage = null;
                    /* $rootScope.successMessage = "Current password is correct.";
                    $timeout(function(){
                        $rootScope.successMessage = null;
                    },2000); */
                    vm.errorPass = false;
                }
            })
            .catch(function(err){
                console.log(err);
            })
    }

    function checkNewConfirmPass(){
        if(vm.newPass && vm.confirmPass){
            if(vm.newPass != vm.confirmPass){
                vm.errorMessage = "New and confirm passwords does not match."
            }
            else{
                if(vm.errorPass == true){
                    vm.errorMessage = "Current password mismatch.";
                }
                else{
                    vm.errorMessage = null;
                }
            }
        }
    }
    vm.init();
};