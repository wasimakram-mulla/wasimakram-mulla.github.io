EmpLogin.controller("LoginController", function($scope, $location, $http, $templateCache, $rootScope, $route){
	$scope.loginSuccess = function(){
		//$(".loaderContainer").show();
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=login',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {'usernm':$scope.email, 'passwd':$scope.passwd},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).then(function(result){
				if(result.data!=null && result.data!=''){					
					$rootScope.showMenus=true;
					if(result.data.role=='admin'){
						$location.path("/attendanceAll");
					}
					else{
						$location.path("/punch");
					}
					$rootScope.adminAccess=result.data.role;					
					localStorage.setItem("userDetails",JSON.stringify(result.data));
				}else{
					alert('Invalid Credentials');
					$scope.email='';
					$scope.passwd='';
					$('#inputEmail').focus();
				}
				$(".loaderContainer").hide();
			}); */
			//alert('All the Database calls are blocked for Security reasons... Thanks.');
			if($scope.email=="test@kk.in" && $scope.passwd=="test@1234"){
				$location.path("/punch");
			}
			else if($scope.email=="admin@kk.in" && $scope.passwd=="admin@1234"){
				$location.path("/attendanceAll");
			}
			else{
				alert('Invalid Credentials...');
			}
			localStorage.setItem("userDetails",JSON.stringify({'usernm':$scope.email, 'passwd':$scope.passwd}));
			$(".loaderContainer").hide();
	};
});

EmpLogin.controller("PunchInController", function($scope, $location, $http, $templateCache, $rootScope, EncDecService){
	$("#verificationCode").focus();
	$scope.genBarCode = function(){		
		var randNo = $scope.generateRandomString();
		var tmpEnc=EncDecService.encryption(randNo, $rootScope.userDetails.authCode, $rootScope.userDetails.username+$rootScope.userDetails.user_id);
		if(tmpEnc.search("/") != -1){
			// Here it checks for any "/" sign in the Encrypted string, Bcoz encrypted string will be considered for path in Angular route.
			$scope.genBarCode();
		}
		else{
			$scope.storeBarcodeToDB(randNo, tmpEnc);
		}
	};
	
	$scope.storeBarcodeToDB = function(randNo, tmpEnc){
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=barcodeGeneration',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {'barCodeDigits':randNo, "authCode": $rootScope.userDetails.authCode, "email": $rootScope.userDetails.email, "encText": tmpEnc},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).then(function(result){
				$("#barCodeContainer").html("<p><strong class='text-success'>Please Click link below for Barcode Generation</strong><br/><br/><a target='_blank' href='#/barcode/:"+tmpEnc+"'>"+window.location.origin+""+window.location.pathname+"#/barcode/:"+tmpEnc+"</a><br/><br/><strong class='text-warning'>Note: Barcode is only valid for 5 minutes.</strong></p>");
				$rootScope.barCodeDigits = result.data.barCodeDigits;
				$rootScope.serverTime = result.data.serverTime;
			}); */
			alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
	
	$scope.generateRandomString = function()
	{
		var text = "";
		var possible = "123456789";

		for( var i=0; i < 8; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	};
	
	$scope.punchIn = function(){
		//$(".loaderContainer").show();
		//alert($scope.verificationCode + " ---- "  + $scope.barCodeDigits);
		var dt = new Date();
		var clientTime = Math.round(dt.getTime()/1000);
		//alert(clientTime + " %%%%%%%%%%%%%% " + $rootScope.serverTime)
		if((clientTime-parseInt($rootScope.serverTime))<300){				
			if(Math.floor($scope.verificationCode/10) == Math.floor(parseInt($rootScope.barCodeDigits)/10)){
				//alert('You have Punched In Successfully');				
				/* $http({
					method: 'POST',
					url: 'php_controllers/master.php?action=PunchIn',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					data: {"authCode": $rootScope.userDetails.authCode},
					cache: $templateCache
					}).
					success(function(data, status, headers, config) {}).
					error(function(data, status, headers, config) {
						alert('Service Error');
					}).then(function(result){
						if(result.data.status==true){
							alert('You have Punched In Successfully');
							$scope.verificationCode='';
						}else{
							$scope.verificationCode='';
							alert('You have already Punched In');
						}
					$(".loaderContainer").hide();
				}); */
				alert('All the Database calls are blocked for Security reasons... Thanks.');
			}else{
				alert('Invalid Barcode');
				$(".loaderContainer").hide();
			}
		}
		else{
			alert('You barcode is Expired, please generate another Barcode');
			$(".loaderContainer").hide();
		}
	};
	
	$scope.punchOut = function(){
		//$(".loaderContainer").show();
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=PunchOut',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {"authCode": $rootScope.userDetails.authCode},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).then(function(result){	
				if(result.data.status==true){
					//console.log('punchInTime: '+ result.data.punchInTime+ '  punchOutTime: '+ result.data.punchOutTime + "  Diff: " + (parseInt(result.data.punchOutTime) - parseInt(result.data.punchInTime)));
					//$scope.workedHrs=parseInt(result.data.punchOutTime) - parseInt(result.data.punchInTime);
					var tmpSecs = parseInt(result.data.punchOutTime) - parseInt(result.data.punchInTime);
					$scope.workedHrs=$scope.CalcTime(tmpSecs);
					alert('You have Punched Out Successfully');
				}else{
					alert('You Need to Punch In First to Punch Out');
				}
				$(".loaderContainer").hide();
			}); */
			alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
	
	$scope.CalcTime = function(Secs){
		var hr=0, min=0, sec=0;
		if(Secs>60){
			min=Math.round(Secs / 60);
			sec=Math.round(Secs % 60);
			if(min>=60){
				hr=Math.round(min / 60);
				min=Math.round(min % 60);
			}
		}
		else{
			sec=Secs;
		}
		return (hr+":"+min+":"+sec);
	};
});

EmpLogin.controller("BarCodeController", function($scope, $location, $http, $templateCache, $rootScope, $routeParams, EncDecService){
	if(!localStorage.userDetails){
		alert('Please Login First');
	}else{
		var str=$routeParams.param.slice(1);
		var barCodeDigits=EncDecService.decryption(str, $rootScope.userDetails.authCode, $rootScope.userDetails.username+$rootScope.userDetails.user_id);	
		$("#barCodeContainer").barcode(barCodeDigits, "ean8",{showHRI:false,barWidth:2, barHeight:80});		
	}
	
	$scope.gobackward = function(){
		$location.path('/punch');
	}
});

EmpLogin.controller("AttendanceController", function($scope, $location, $http, $templateCache, $rootScope, $filter){
	//$(".loaderContainer").show();	
	$scope.allAttenLogs = new Array();
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=attendanceIndividual',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {"authCode": $rootScope.userDetails.authCode, "mnth":"false"},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).then(function(result){
				if(result.data[0].status==true){
					$scope.allAttenLogs=result.data;					
					for(var i=0;i<result.data.length;i++){
						var tmpTime=0;
						if(result.data[i].punchOutTime!=null){
							tmpTime=parseInt(result.data[i].punchOutTime)-parseInt(result.data[i].punchInTime);
							var newtmpTime=$scope.CalcTime(tmpTime);					
							$scope.allAttenLogs[i].hrsWorked=newtmpTime;
						}
						else{
							$scope.allAttenLogs[i].hrsWorked="-";
						}
					}
					$scope.selectedTab=$filter('date')(parseInt(result.data[0].punchInTime)*1000, "MMM").toUpperCase();			
				}
				else{
					$scope.allAttenLogs=[];					
				}
				$(".loaderContainer").hide();
			}); */
			alert('All the Database calls are blocked for Security reasons... Thanks.');
	
	$scope.CalcTime = function(Secs){
		var hr=0, min=0, sec=0;
		if(Secs>60){
			min=Math.round(Secs / 60);
			sec=Math.round(Secs % 60);
			if(min>=60){
				hr=Math.round(min / 60);
				min=Math.round(min % 60);
			}
		}
		else{
			sec=Secs;
		}
		return (hr+":"+min+":"+sec);
	};
	
	$scope.changeMonthAttn = function(mnth){
		/* $(".loaderContainer").show();
		$http({
			method: 'POST',
			url: 'php_controllers/master.php?action=attendanceIndividual',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {"authCode": $rootScope.userDetails.authCode,"mnth":mnth},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).then(function(result){
				if(result.data[0].status==true){
					$scope.allAttenLogs=result.data;					
					for(var i=0;i<result.data.length;i++){
						var tmpTime=0;
						if(result.data[i].punchOutTime!=null){
							tmpTime=parseInt(result.data[i].punchOutTime)-parseInt(result.data[i].punchInTime);
							var newtmpTime=$scope.CalcTime(tmpTime);					
							$scope.allAttenLogs[i].hrsWorked=newtmpTime;
						}
						else{
							$scope.allAttenLogs[i].hrsWorked="-";
						}
					}
				}
				else{
					$scope.allAttenLogs=[];
					
				}
				$(".loaderContainer").hide();
			}) */
			alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
});

EmpLogin.controller("AttendanceAllController", function($scope, $location, $http, $templateCache, $rootScope, $filter){
	$scope.showTab=false;
	$scope.selUser;	
	//$(".loaderContainer").show();
	$scope.allAttenLogs = new Array();
	$scope.usrAttenLogs = new Array();
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=attendanceAll',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).then(function(result){
				$scope.allAttenLogs=result.data;				
				$(".loaderContainer").hide();				
			}); */
			alert('All the Database calls are blocked for Security reasons... Thanks.');
			
	$scope.showUserAttendanceLog = function(authCode, selUser){
		//$(".loaderContainer").show();
		$scope.showTab=true;
		$scope.tmpAuthCode = authCode;
		$scope.selUser=selUser;
		/* $http({
			method: 'POST',
			url: 'php_controllers/master.php?action=attendanceIndividual',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {"authCode": authCode, "mnth":"false"},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).then(function(result){
				if(result.data[0].status==true){
					$scope.usrAttenLogs=result.data;
					for(var i=0;i<result.data.length;i++){
						var tmpTime=0;
						if(result.data[i].punchOutTime!=null){
							tmpTime=parseInt(result.data[i].punchOutTime)-parseInt(result.data[i].punchInTime);
							var newtmpTime=$scope.CalcTime(tmpTime);					
							$scope.usrAttenLogs[i].hrsWorked=newtmpTime;
						}
						else{
							$scope.usrAttenLogs[i].hrsWorked="-";
						}
					}
					$scope.selectedTab=$filter('date')(parseInt(result.data[0].punchInTime)*1000, "MMM").toUpperCase();
				}else{
					$scope.usrAttenLogs= [];					
				}
				$(".loaderContainer").hide();				
			}); */
			alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
	
	$scope.CalcTime = function(Secs){
		var hr=0, min=0, sec=0;
		if(Secs>60){
			min=Math.round(Secs / 60);
			sec=Math.round(Secs % 60);
			if(min>=60){
				hr=Math.round(min / 60);
				min=Math.round(min % 60);
			}
		}
		else{
			sec=Secs;
		}
		return (hr+":"+min+":"+sec);
	};
	
	$scope.changeMonthAttn = function(mnth){
		/* $(".loaderContainer").show();
		$http({
			method: 'POST',
			url: 'php_controllers/master.php?action=attendanceIndividual',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {"authCode": $scope.tmpAuthCode,"mnth":mnth},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
			}).then(function(result){
				if(result.data[0].status==true){
					$scope.usrAttenLogs=result.data;					
					for(var i=0;i<result.data.length;i++){
						var tmpTime=0;
						if(result.data[i].punchOutTime!=null){
							tmpTime=parseInt(result.data[i].punchOutTime)-parseInt(result.data[i].punchInTime);
							var newtmpTime=$scope.CalcTime(tmpTime);					
							$scope.usrAttenLogs[i].hrsWorked=newtmpTime;
						}
						else{
							$scope.usrAttenLogs[i].hrsWorked="-";
						}
					}
				}
				else{
					$scope.usrAttenLogs=[];
					
				}
				$(".loaderContainer").hide();
			}) */
			alert('All the Database calls are blocked for Security reasons... Thanks.');
	};
});

EmpLogin.controller("AddEmployeeController", function($scope, $location, $http, $templateCache, $rootScope){
	$scope.addEmployeeDetails = function(){
		/* $(".loaderContainer").show();	
		$http({
			method: 'POST',
			url: 'php_controllers/master.php?action=addEmployeeDetails',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {"username": $scope.fname, "emailId": $scope.email},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
				$(".loaderContainer").hide();
			}).then(function(result){
				if(result.data.status){
					alert("Successfully added Employee");
					$scope.fname="";
					$scope.email="";
				}else{
					alert("Error!!!");
				}				
				$(".loaderContainer").hide();
			}); */
			alert('All the Database calls are blocked for Security reasons... Thanks.');
	}
	
	$scope.resetForm = function(){
		$scope.fname="";
		$scope.email="";
	}
});

EmpLogin.controller("AdminUserRedirectController", function($scope, $location, $http, $templateCache, $rootScope){	
	if($rootScope.adminAccess!='user'){
		$location.path('/attendanceAll');		
	}
});

EmpLogin.controller("ChangePassController", function($scope, $location, $http, $templateCache, $rootScope){	
	$scope.changePass = function(){
		/* $(".loaderContainer").show();	
		$http({
			method: 'POST',
			url: 'php_controllers/master.php?action=chngPass',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: {"newpassword": $scope.nPass, "authCode": $rootScope.userDetails.authCode},
			cache: $templateCache
			}).
			success(function(data, status, headers, config) {}).
			error(function(data, status, headers, config) {
				alert('Service Error');
				$(".loaderContainer").hide();
			}).then(function(result){
				if(result.data.status){
					alert("Successfully updated Password");
					$scope.nPass="";
					$scope.cPass="";
				}else{
					alert("Error!!!");
				}				
				$(".loaderContainer").hide();
			}); */
			alert('All the Database calls are blocked for Security reasons... Thanks.');
	};

	$scope.resetForm = function(){
		$scope.nPass="";
		$scope.cPass="";
	}
});

EmpLogin.controller("HomeController", function($scope, $location, $http, $templateCache, $rootScope){
	//$scope.selectedTab = 
	$scope.logout = function(){
		localStorage.removeItem("userDetails");
		$rootScope.userDetails={};
		$location.path('/login');
	}
});

