var twitchControllers = angular.module('twitchControllers', []);

twitchControllers.filter("toArray", function(){
    return function(obj) {
        var result = [];
        angular.forEach(obj, function(val, key) {
            result.push(val);
        });
        return result;
    };
});

twitchControllers.controller('mainController', ['$scope', 'Streams','Games', 'streamsAzubu', function($scope, Streams, Games, streamsAzubu){
	$scope.test = 'test';

	Games.getAll().success(function(data){
		$scope.games = data.top;

		$scope.topStreams = [];

		var completed = 0;

		async.forEach($scope.games, function(stream, callback){

			Streams.searchMany(stream.game.name).success(function(data){
				completed++;

				for (x in data.streams){
					data.streams[x]['platform'] = "twitch";
				}
			
			// var azubuArray = { "League of Legends": "league-of-legends", "Counter-Strike: Global Offensive": "csgo", 
			// "Dota 2": "dota-2", "Hearthstone: Heroes of Warcraft": "hearthstone", "StarCraft II: Heart of the Swarm": "starcraft-ii", 
			// "Heroes of the Storm": "heroes-of-the-storm"};
				

			// 	streamsAzubu.getLive(azubuArray[stream.game.name]).success(function(data2){

			// 		for (x in data2.data){
			// 			data.streams.push({
			// 				"preview": {
			// 					"large": data2.data[x].url_thumbnail
			// 				},
			// 				"channel": {
			// 					"name": data2.data[x].user.display_name
			// 				},
			// 				"platform": "azubu",
			// 				"viewers": data2.data[x].view_count
			// 			});

			// 		}



			// 		data.streams.sort(function(a,b) {return b.viewers - a.viewers});


					$scope.topStreams.push({
						streams: data.streams,
						name: stream.game.name,
						viewers: stream.viewers
					});

					// }).error(function(err){
					// 	console.log(err);
					// });

				if (completed == $scope.games.length){
					$scope.topStreams.sort(function(a,b) { return b.viewers - a.viewers } );
					console.log($scope.topStreams);
					$state.reload();
				}

			}).error(function(err){

			});
		}, function(err){

		});

	}).error(function(err){
		console.log(err)
	});

}]);