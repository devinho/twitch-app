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
	$scope.test = 'test';

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

	}).error(function(err){
		console.log(err)
	});

	

}]);