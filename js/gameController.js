twitchControllers.controller('gameController',  ['$scope', 'Streams', '$routeParams', 'streamsAzubu', function($scope, Streams, $routeParams, streamsAzubu){
		$scope.results = [];
		$scope.game = $routeParams.game;
		$scope.azubu = [];

		var azubuArray = { "League of Legends": "league-of-legends", "Counter-Strike: Global Offensive": "csgo", 
			"Dota 2": "dota-2", "Hearthstone: Heroes of Warcraft": "hearthstone", "StarCraft II: Heart of the Swarm": "starcraft-ii", 
			"Heroes of the Storm": "heroes-of-the-storm"};

		Streams.searchMany($scope.game).success(function(data){
			$scope.results = data.streams;

			for (x in $scope.results){
				$scope.results[x]['platform'] = "twitch";
			}	
			
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
						},
						"platform": "azubu",
						"viewers": list[x].view_count
					});
				}

				$scope.results.sort(function(a,b) {return b.viewers - a.viewers});
				
				// console.log(data.streams);
			}).error(function(err){
				console.log(err);
			});
		}).error(function(err){
			console.log(err);
		});

		

		


		// });
}]);