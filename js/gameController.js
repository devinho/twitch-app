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
				$scope.results[x]['logo'] = "http://img3.wikia.nocookie.net/__cb20140727180700/logopedia/images/8/83/Twitch_icon.svg";
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
						"viewers": list[x].view_count,
						"logo": "https://pbs.twimg.com/profile_images/521769849651879936/Ch1accfC_400x400.png"
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