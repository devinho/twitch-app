twitchControllers.controller('gameController',  ['$scope', 'Streams', '$routeParams', 'streamsAzubu', function($scope, Streams, $routeParams, streamsAzubu){
		$scope.results = [];
		$scope.game = $routeParams.game;
		$scope.azubu = [];

		var azubuArray = { "League of Legends": "league-of-legends", "Counter-Strike: Global Offensive": "csgo", 
			"Dota 2": "dota-2", "Hearthstone: Heroes of Warcraft": "hearthstone", "StarCraft II: Heart of the Swarm": "starcraft-ii", 
			"Heroes of the Storm": "heroes-of-the-storm"};

		Streams.searchMany($scope.game).success(function(data){
			$scope.results = data.streams;
		}).error(function(err){
			console.log(err);
		});

		streamsAzubu.getLive(azubuArray[$scope.game]).success(function(data){

			var list = data.data;
			var stream = [];
			for (x in list) {
				$scope.results.push({
					"preview": {
						"large": list[x].url_thumbnail
					},
					"channel": {
						"name": list[x].user.display_name
					}
				});
			}
		});
}]);