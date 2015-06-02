twitchControllers.controller('gameController',  ['$scope', 'Streams', '$routeParams', 'streamsAzubu', function($scope, Streams, $routeParams, streamsAzubu){
		$scope.results = [];
		$scope.game = $routeParams.game;
		$scope.azubu = [];

		Streams.searchMany($scope.game).success(function(data){
			$scope.results = data.streams;
		}).error(function(err){
			console.log(err);
		});
}]);