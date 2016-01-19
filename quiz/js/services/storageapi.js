quiz.service('StorageAPI', ['$q', function($q) {
	this.selectedPropertyListData = null;
	this.userDetails = null;	
	this.addNewProperty = false;	//Used to control disable state on Property details page
}]);