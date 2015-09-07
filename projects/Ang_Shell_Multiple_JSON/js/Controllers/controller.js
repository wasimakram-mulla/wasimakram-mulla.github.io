CoreStructure.controller("BasicController", function($scope){
	//localStorage.setItem('jsonFile','Wasim');
});

CoreStructure.controller("MainController", function($scope){
	//localStorage.setItem('jsonFile','json1');
	this.addStorage = function(tmpVar){	
		localStorage.setItem('jsonFile',tmpVar);		
	};
});

CoreStructure.controller("DataLoadController", function($scope, $http) {
	var vm = this;
	vm.mydata = [];
	vm.tmpVar=localStorage.getItem('jsonFile');	
	if(vm.tmpVar!=null){
		var databasePath='database/'+vm.tmpVar+'.json';
		$http.get(databasePath)
			.then(function(result) {
			  vm.mydata = result.data.page;
			 });
	}
	else{
		alert('No JSON File Found!!! Please Click Link..');
	}
});