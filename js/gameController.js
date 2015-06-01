twitchControllers.controller('gameController',  ['$scope', 'Streams', '$routeParams', function($scope, Streams, $routeParams){
		$scope.results = []
		$scope.game = $routeParams.game;



		Streams.searchMany($scope.game).success(function(data){
			$scope.results = data.streams;
		}).error(function(err){
			console.log(err);
		});
}]);