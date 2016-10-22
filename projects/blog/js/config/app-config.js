angular.module('BlogApp').config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/allblogs', {
			templateUrl: 'templates/AllBlogs/AllBlogs.html',
			controller: 'AllBlogsController',
			controllerAs: 'AllBlogsCtrl'
		})
		.when('/blogDetails', {
			templateUrl: 'templates/BlogDetails/BlogDetails.html',
			controller: 'BlogDetailsController',
			controllerAs: 'BlogDetCtrl'
		})
		.when('/newblog', {
			templateUrl: 'templates/NewBlog/NewBlogPost.html',
			controller: 'NewBlogController',
			controllerAs: 'NewBlogCtrl'
		})
		.when('/reguser', {
			templateUrl: 'templates/Registration/Registration.html',
			controller: 'RegistrationController',
			controllerAs: 'RegCtrl'
		})
		.when('/', {
			redirectTo: '/allblogs'
		});
});