twitchControllers.controller('streamController',  ['$scope', '$sce', 'Streams', '$routeParams', function($scope, $sce, Streams, $routeParams){
		$scope.results = []
		$scope.game = $routeParams.game;
		$scope.stream = $routeParams.stream;

		$scope.twitchPlayer = '<iframe id="player" type="text/html" width="1000" height="500"
		src="http://www.twitch.tv/' +  $scope.stream + '/embed"
		frameborder="0"></iframe>'

  		$scope.twitchChat = '<iframe frameborder="0" 
        scrolling="no" 
        id="chat_embed" 
        src="http://www.twitch.tv/'+  $scope.stream + '/chat" 
        height="500" 
        width="1000">
		</iframe>'

		$scope.injectPlayer = function(){
			return $sce.trustAsHtml($scope.twitchPlayer);
		}

		$scope.injectChat = function(){
			return $sce.trustAsHtml($scope.twitchChat);
		}

		// Streams.search('league of legends').success(function(data){
		// 	$scope.results = data.streams;
		// }).error(function(err){

		// });
}]);