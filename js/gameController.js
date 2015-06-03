twitchControllers.controller('gameController',  ['$scope', 'Streams', '$routeParams', 'streamsAzubu', function($scope, Streams, $routeParams, streamsAzubu){
		$scope.results = [];
		$scope.game = $routeParams.game;
		$scope.azubu = [];

		var azubuArray = { "League of Legends": "league-of-legends", "Counter-Strike: Global Offensive": "csgo", "Dota 2": "Dota-2", "Hearthstone: Heroes of Warcraft": "hearthstone", "StarCraft II: Heart of the Swarm": "starcraft-ii"};

		Streams.searchMany($scope.game).success(function(data){
			// console.log(azubuArray[$scope.game])
			$scope.results = data.streams;
			for (x in $scope.results){
				$scope.results[x]['platform'] = "twitch";
			}	
			streamsAzubu.getLive(azubuArray[$scope.game]).success(function(data){

			var list = data.data;
			var stream = [];
			for (x in list) {
				// console.log(list[x])
				// console.log(list[x].alt_name);
				$scope.results.push({
					"preview": {
						"large": list[x].url_thumbnail
					},
					"channel": {
						"name": list[x].user.display_name
					},
					"platform": "azubu"
				});
			}
			
			// console.log(data.streams);
		}).error(function(err){
			console.log(err);
		});

		


		});
}]);