quiz.service('ServiceAPI', ['$http', '$q', function($http, $q) {
	this.loadService = function(path, method, data){
		console.log("Service Loaded: "+path+" data: "+ data);
		return $q(function(resolve, reject){
			$http({
				url:path,
				method:method
			}).then(function(response){
				resolve(response.data);
			}).catch(function(err){				
				reject(err);
			});
		})
	};
}]);