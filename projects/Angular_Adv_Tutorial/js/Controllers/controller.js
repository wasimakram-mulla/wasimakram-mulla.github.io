CoreStructure.controller("BasicController", function($scope){});

CoreStructure.controller("SearchController", function($scope){
	this.companyData=companyData;	
	this.addRow = function(){
		this.companyData.push({ 'Name':$scope.Name, 'Employees': $scope.Employees, 'HO':$scope.HO });
		$scope.Name='';
		$scope.Employees='';
		$scope.HO='';
	};
	
	this.removeRow = function(nm){		
		var index=-1;
		for(var i=0;i<this.companyData.length;i++){
			if(this.companyData[i].Name==nm){
				index=i;
			}
		}
		if(index==-1){
			alert('Error');
		}
		
		this.companyData.splice(index,1);
		index=null;
	};
});

CoreStructure.controller("localizationController", function($translate, $scope){
	$scope.selLanguage='EN-US';
		
	this.changeLang = function(){
		if($scope.selLanguage=='EN-US'){
			$translate.use('en')
		}
		else{
			$translate.use('de')
		}
	}
});

var companyData=[
	{		
		"Name":"Google",
		"Employees":"47,756",
		"HO":"Mountain View, CA"
	},
	{	
		"Name":"Microsoft",
		"Employees":"93000",
		"HO":"Washington"
	}
	];
	

CoreStructure.controller('MyCtrl', function($scope) {
	$(".gridDetails").hide();
	$scope.mySelections = [];
	$scope.myData = [
	{id:0, rank:"1", name: "Uttar Pradesh", population: '199,581,477'},
	{id:1, rank:"2", name: "Maharashtra", population: '112,372,972'},
	{id:2, rank:"6", name: "Madhya Pradesh", population: '72,597,565'}];
	
	$scope.sortedData = [
		[
			{persons:'3,464,228', male:'1,835,740', female:'1,628,488', name: "Saharanpur"},
			{persons:'4,138,605', male:'2,194,540', female:'1,944,065', name: "Muzaffarnagar"},
			{persons:'3,683,896', male:'1,925,787', female:'1,758,109', name: "Bijnor"},
			{persons:'4,773,138', male:'2,508,299', female:'2,264,839', name: "Moradabad"},
			{persons:'2,335,398', male:'1,226,175', female:'1,109,223', name: "Rampur"}
		],
		[
			{persons:'1646177', male:'834866', female:'811311', name: "Nandurbar"},
			{persons:'2048781', male:'1055669', female:'993112', name: "Dhule"},
			{persons:'4224442', male:'2197835', female:'2026607', name: "Jalgaon"},
			{persons:'2588039', male:'1342152', female:'1245887', name: "Buldana"}
		],
		[
			{persons:'687,952', male:'361,685', female:'326,267', name: "Sheopur"},
			{persons:'1,965,137', male:'1,068,364', female:'896,773', name: "Morena"},
			{persons:'1,703,562', male:'926,940', female:'776,622', name: "Bhind"}
		]
	];	
	
	$scope.gridOptions = { 
		data: 'myData',
		selectedItems: $scope.mySelections,
		multiSelect: false,
		columnDefs:[
			{field:'rank', displayName:'Rank'},
			{field:'name', displayName:'Name'},
		    {field:'population', displayName:'Population'}
		],
		afterSelectionChange: 	function (rowItem, event) {	
			 if($scope.mySelections[0]){
				$scope.selData = $scope.mySelections[0].id;
				$scope.pathData = $scope.sortedData[$scope.selData];
				$(".gridDetails").show();
			}
		return $scope.pathData;	
		}
	};
	    
	$scope.gridDetails = { 
		data: 'pathData',
		selectedItems: $scope.mySelections,
		multiSelect: false,
		enableRowSelection:false,
		columnDefs:[
			{field:'name', displayName:'District'},
			{field:'persons', displayName:'Persons'},
			{field:'male', displayName:'Males'},
			{field:'female', displayName:'Females'}
		],
	};
});

CoreStructure.controller('HelloCtrl', ['$scope', function($scope) {
	$scope.name='';
}]);

CoreStructure.directive( "myCustomer", function() {
    return {
		template: '<h2>Hello: <span class="text-danger">{{name}}</span>  How are you today?</h2>'
  };
});


CoreStructure.service('MathService', function() {
    this.add = function(a, b) { return a + b };
     
    this.subtract = function(a, b) { return a - b };
     
    this.multiply = function(a, b) { return a * b };
     
    this.divide = function(a, b) { return a / b };
});
 
CoreStructure.service('CalculatorService', function(MathService){
     
    this.square = function(a) { return MathService.multiply(a,a); };
    this.cube = function(a) { return MathService.multiply(a, MathService.multiply(a,a)); };
 
});
 
CoreStructure.controller('CalculatorController', function($scope, CalculatorService) {
 
    $scope.doSquare = function() {
        $scope.answer = CalculatorService.square($scope.number);
    }
 
    $scope.doCube = function() {
        $scope.answer = CalculatorService.cube($scope.number);
    }
});







