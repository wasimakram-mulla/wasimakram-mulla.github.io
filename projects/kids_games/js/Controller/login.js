$(document).ready(function(){
	login.init();
});

var login = {};

login.init = function(){
	login.loadData();
	login.globalData;	
};

login.loadData = function(){
	$.getJSON('database/login.json', function(data){		
	}).done(function(data){
		login.globalData=data.login;
		login.addEvents();
		login.username="";
		login.firstname="";
	});
};

login.addEvents = function(){
	$("#buttonSubmit").click(function(){
		var flag=false;
		if($("#inputEmail").val()!="" && $("#inputPassword").val()!=""){
			for(var i=0;i<login.globalData.length;i++){
				if(login.globalData[i].username == $("#inputEmail").val() && login.globalData[i].username == $("#inputPassword").val())
				{
					login.username = login.globalData[i].username;
					login.firstname = login.globalData[i].firstName;
					flag=true;
					break;
				}
			}
			
			if(flag){				
				document.cookie="username="+login.username;
				document.cookie="firstname="+login.firstname;
				window.location.assign('index.php');
			}
			else{
				document.getElementById('inputEmail').value='';
				document.getElementById('inputPassword').value=''
				alert("Invalid Credentials!!!");
				document.getElementById('inputEmail').focus();
			}
		}
	});
};