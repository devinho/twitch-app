var twitchApp = angular.module('twitchApp', ['ngRoute', 'twitchControllers', 'twitchServices']);

twitchApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'partials/home.html',
     		controller: 'mainController'
		}).
		when('/search',{
			templateUrl: 'partials/search.html',
			controller: 'searchController'
		}).
		when('/game/:game', {
			templateUrl: 'partials/game.html',
     		controller: 'gameController'
		}).
		when('/game/:game/:stream', {
			templateUrl: 'partials/stream.html',
     		controller: 'streamController'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);