angular.module("chatapp",[])
	.controller("ChatController", ChatController);

ChatController.$inject=["$timeout"];

function ChatController($timeout){
	var vm=this;
	vm.showSigninForm=true;
	vm.showRegisterForm=false;
	vm.showChatForm=false;
	vm.showPersonalChatForm=false;
	vm.myUserDataRef = new Firebase('https://wasimuserreg.firebaseio.com/');
	vm.myChatDataRef = new Firebase('https://chatwasim.firebaseio.com/');
	vm.personalChatDataRef = new Firebase('https://chatwasim.firebaseio.com/');
	vm.signin = signin;
	vm.startChat = startChat;
	vm.selectUser = selectUser;
	vm.goBackToHome = goBackToHome;
	vm.clickedUser = null;
	vm.goHome = goHome;
	vm.enableRegisterForm = enableRegisterForm;
	vm.registerUser = registerUser;
	vm.addMessage = addMessage;
	vm.personalAddMessage = personalAddMessage;
	vm.logout = logout;
	vm.username="";
	vm.flag=false;
	vm.showError=false;
	vm.registerText="Register";
	vm.users=new Array();
	vm.totalMessageCnt=0;
	vm.newMessageUser=null;
	vm.notificationText="";
	$(".notification").hide();

	if(sessionStorage.getItem("chatuser")){
		vm.showSigninForm=false;
		vm.showRegisterForm=false;
		vm.showChatForm=true;
		vm.showPersonalChatForm=false;
		vm.username=sessionStorage.getItem("chatuser");
		vm.flag=true;
	}

	if(sessionStorage.getItem("personalChatStarted")=="true"){
		vm.showSigninForm=false;
		vm.showRegisterForm=false;
		vm.showPersonalChatForm=true;
		vm.showChatForm=false;
	}

	if(sessionStorage.getItem("selectedUser"))
	{
		var selectedUser=sessionStorage.getItem("selectedUser");
		vm.clickedUser=selectedUser;
		vm.personalChatDataRef.on('child_added', function(snapshot) {
			var message = snapshot.val();
			if(message.grouped == selectedUser+"_"+vm.username || message.grouped == vm.username+"_"+selectedUser){
				displayPersonalChatMessage(message.username, message.message);
			}
		});
	}

	vm.myUserDataRef.on('child_added', function(snapshot) {
		var message = snapshot.val();
		vm.users.push({"username":message.username, "password":message.password, "selected": false});
	});

	vm.myChatDataRef.once('value', function(snapshot) {		//to Calculate total number of messages
		//vm.totalMessageCnt=snapshot.numChildren();
		vm.totalMessageCnt=0;
		snapshot.forEach(function(data) {
			if(data.val().grouped.search(vm.username)!=-1)
			{
				//console.log("Hello")
				vm.totalMessageCnt++;
			}
		});
		console.log("once: " + vm.totalMessageCnt)
	});

	vm.myChatDataRef.on('value', function(snapshot) {
		var tmpCnt=0;
		snapshot.forEach(function(data) {
			if(data.val().grouped.search(vm.username)!=-1)
			{
				vm.newMessageUser=data.val().username;
				tmpCnt++;
			}
		});
	
		console.log(tmpCnt+" -*- "+ vm.totalMessageCnt +" $$ "+ vm.showChatForm);
		console.log(tmpCnt>vm.totalMessageCnt && vm.showChatForm==true);
		if(tmpCnt>vm.totalMessageCnt && vm.showChatForm==true && vm.totalMessageCnt!=0){
			vm.notificationText=vm.newMessageUser + " messaged you. please click and start a chat with him."
			$(".notification").show();
			hideNotification();
			vm.totalMessageCnt=tmpCnt;
		}
	});

	function hideNotification(){
		$timeout(function(){			
			$('.notification').fadeOut();
		},3000);
	}
	
	vm.myChatDataRef.on('child_added', function(snapshot) {
		var message = snapshot.val();
		if(message.grouped=="all"){
			displayChatMessage(message.username, message.message);
		}
	});

	$timeout(function(){
		vm.users=vm.users;
	},2500);

	function signin(){
		for(var i=0;i<vm.users.length;i++){
			var chkUsr= checkUser(vm.users[i], vm.usernm, vm.passwd);
			if( chkUsr == true)
			{
				vm.flag=chkUsr;
				break;
			}
			else{
				vm.flag=false;
			}
		}

		if(vm.flag==true){
			sessionStorage.setItem("chatuser",vm.usernm);
			//vm.myChatDataRef.push({"username":vm.usernm, "message": "joined the group.", "grouped":"all"});
			vm.showSigninForm=false;
			vm.showRegisterForm=false;
			vm.showPersonalChatForm=false;
			vm.showChatForm=true;
			vm.username=vm.usernm;
		}
		else{
			vm.showError=true;
			$timeout(function(){
				vm.usernm="";
				vm.passwd="";
				vm.showError=false;
			},2500);
		}
	};

	function enableRegisterForm(){
		vm.showSigninForm=false;
		vm.showRegisterForm=true;
		vm.showChatForm=false;
		vm.showPersonalChatForm=false;
	};

	function registerUser(){
		var name = vm.RegUser;
		var textdata = vm.RegPasswd;
		var tmpFlag=false;
		for(var i=0;i<vm.users.length;i++){
			var chkUsr= checkUser(vm.users[i], vm.RegUser, vm.RegPasswd);
			if( chkUsr == true)
			{
				tmpFlag=chkUsr;
				break;
			}
			else{
				tmpFlag=false;
			}
		}

		if(tmpFlag == false){
			vm.myUserDataRef.push({username: name, password: textdata});
			vm.RegUser="";
			vm.RegPasswd="";
			vm.RegConfPasswd="";
			vm.showSigninForm=true;
			vm.showRegisterForm=false;
			vm.showChatForm=false;
			vm.showPersonalChatForm=false;
			vm.username=null;
			vm.flag=false;
		}
		else{
			vm.registerText="User already registered... Try again.";
			$timeout(function(){
				vm.registerText="Register";
				vm.RegUser="";
				vm.RegPasswd="";
				vm.RegConfPasswd="";
			},2500)
		}
	};

	function goHome(){
		vm.showSigninForm=true;
		vm.showRegisterForm=false;
		vm.showChatForm=false;
		vm.showPersonalChatForm=false;
	};

	function goBackToHome(){
		vm.showSigninForm=false;
		vm.showRegisterForm=false;
		vm.showChatForm=true;
		vm.showPersonalChatForm=false;
		$("#personalChatMessages").text("");
		sessionStorage.removeItem("selectedUser");
		sessionStorage.removeItem("personalChatStarted");
	};

	function displayChatMessage(name, text) {
		$("#chatMessages").append(name + ": "+ text+"\n");
	};

	function displayPersonalChatMessage(name, text) {
		$("#personalChatMessages").append(name + ": "+ text+"\n");
	};

	function checkUser(userObj, usr, pwd){
		if(usr == userObj.username && pwd == userObj.password){
			return true;
		}
	};

	function addMessage(){
		vm.myChatDataRef.push({"username":vm.username,"message": vm.chatText, "grouped":"all"});
		vm.chatText="";
	};

	function logout(){
		vm.showSigninForm=true;
		vm.showRegisterForm=false;
		vm.showChatForm=false;
		vm.showPersonalChatForm=false;
		vm.username=null;
		vm.usernm="";
		vm.passwd="";
		vm.flag=false;
		sessionStorage.removeItem("chatuser");
		sessionStorage.removeItem("selectedUser");
		sessionStorage.removeItem("personalChatStarted");
	};

	function selectUser(user){
		vm.clickedUser=user;
		sessionStorage.setItem("personalChatStarted","true");
		sessionStorage.setItem("selectedUser",vm.clickedUser);
	};

	function startChat(){
		$("#personalChatMessages").text("");
		vm.showSigninForm=false;
		vm.showRegisterForm=false;
		vm.showChatForm=false;
		vm.showPersonalChatForm=true;
		vm.personalChatDataRef.push({"username":vm.username,"message": "joined.", "grouped": vm.username+"_"+vm.clickedUser});

		vm.personalChatDataRef.on('child_added', function(snapshot) {
			var message = snapshot.val();
			if(message.grouped == vm.username+"_"+vm.clickedUser || message.grouped == vm.clickedUser+"_"+vm.username){
				displayPersonalChatMessage(message.username, message.message);
			}
		});
	};

	function personalAddMessage(){
		vm.personalChatDataRef.push({"username":vm.username,"message": vm.personalChatText, "grouped":vm.username+"_"+vm.clickedUser});
		vm.personalChatText="";
	};
}
