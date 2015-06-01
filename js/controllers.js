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

twitchControllers.controller('mainController', ['$scope', 'Streams','Games', function($scope, Streams, Games){

	$scope.isLast = function(check) {
	    var cssClass = check ? 'large-2 columns end' : null;
	    return cssClass;
	};
	Games.getAll().success(function(data){
		$scope.games = data.top;

		$scope.topStreams = [];

		var completed = 0;



		async.forEach($scope.games, function(stream, callback){

			Streams.searchMany(stream.game.name).success(function(data){
				completed++;
				$scope.topStreams.push({
					streams: data.streams,
					name: stream.game.name,
					viewers: stream.viewers
				});


				if (completed == $scope.games.length){
					$scope.topStreams.sort(function(a,b) { return b.viewers - a.viewers } );
					console.log($scope.topStreams);
				}
			}).error(function(err){

			});
		}, function(err){

		});

		// for (var i in $scope.games){
		// 	$scope.topStreams[$scope.games[i].game.name] = [];
		// 	Streams.searchFew($scope.games[i].game).success(function(data){
		// 		completed++;
		// 		console.log(data);
		// 		// $scope.topStreams[data.streams[]].push(data.stream);

		// 		if (completed == $scope.games.length - 1){
		// 			console.log($scope.topStreams);
		// 		}
		// 	}).error(function(err){

		// 	});
		// }

	}).error(function(err){
		console.log(err)
	});

	

	// for (var i = 0 ; i < $scope.games.length; i++){
	// 	Streams.searchFew($scope.games[i].game).success(function(data){
	// 		console.log($scope.games.top.game);
	// 	}).error(function(err){
	// 		console.log(err);
	// 	});
	// }

	

}]);