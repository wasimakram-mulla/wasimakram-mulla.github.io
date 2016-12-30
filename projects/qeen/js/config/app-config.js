angular.module('Qeen').config(function($routeProvider, $locationProvider, BackandProvider) {
	$routeProvider
		.when('/allquestions', {
			templateUrl: 'templates/AllQuestions/AllQuestions.html',
			controller: 'AllQuestionsController',
			controllerAs: 'AllQuesCtrl'
		})
		.when('/sign-in', {
			templateUrl: 'templates/SignIn/SignIn.html',
			controller: 'SignInController',
			controllerAs: 'SignInCtrl'
		})
		.when('/sign-up', {
			templateUrl: 'templates/SignUp/SignUp.html',
			controller: 'SignUpController',
			controllerAs: 'SignUpCtrl'
		})
		.when('/ask-question', {
			templateUrl: 'templates/AskQuestion/AskQuestion.html',
			controller: 'AskQuestionController',
			controllerAs: 'AskQuesCtrl'
		})
		.when('/teams', {
			templateUrl: 'templates/Teams/Teams.html',
			controller: 'TeamController',
			controllerAs: 'TeamCtrl'
		})
		.when('/create-project', {
			templateUrl: 'templates/CreateProject/CreateProject.html',
			controller: 'CreateProjectController',
			controllerAs: 'CreatePrjCtrl'
		})
		.when('/question-details/:quePath', {
			templateUrl: 'templates/QuestionDetails/QuestionDetails.html',
			controller: 'QuestionDetailsController',
			controllerAs: 'QueDetsCtrl'
		})
		.when('/leave-project', {
			templateUrl: 'templates/LeaveProject/LeaveProject.html',
			controller: 'LeaveProjectController',
			controllerAs: 'leavePrjCtrl'
		})
		.when('/request-project', {
			templateUrl: 'templates/RequestProject/RequestProject.html',
			controller: 'RequestProjectController',
			controllerAs: 'ReqPrjCtrl'
		})
		.when('/approvals', {
			templateUrl: 'templates/Approvals/Approvals.html',
			controller: 'ApprovalController',
			controllerAs: 'ApproveCtrl'
		})
		.when('/change-password', {
			templateUrl: 'templates/ChangePassword/ChangePassword.html',
			controller: 'ChangePasswordController',
			controllerAs: 'ChngPassCtrl'
		})
		.when('/profile/:userDet', {
			templateUrl: 'templates/Profile/Profile.html',
			controller: 'ProfileController',
			controllerAs: 'ProfileCtrl'
		})
		.when('/search-user', {
			templateUrl: 'templates/SearchUser/SearchUser.html',
			controller: 'SearchUserController',
			controllerAs: 'searchUsrCtrl'
		})
		.when('/question-tags', {
			templateUrl: 'templates/QuestionTags/QuestionTags.html',
			controller: 'QuestionTagsController',
			controllerAs: 'QueTagCtrl'
		})
		.when('/', {
			redirectTo: '/allquestions'
		});

	BackandProvider.setAppName('qeen');
	BackandProvider.setSignUpToken('bf636dcb-f873-4146-8870-536ad8168142');
	BackandProvider.setAnonymousToken('0fe1e449-3471-4eca-b3ca-45139fb84875');
});