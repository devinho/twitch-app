twitchControllers.controller('streamController',  ['$scope', '$sce', 'Streams', '$routeParams', function($scope, $sce, Streams, $routeParams){
		$scope.results = []
		$scope.game = $routeParams.game;
		$scope.stream = $routeParams.stream;
		$scope.platform = $routeParams.platform;

		if($scope.platform == "twitch"){
			$scope.player = '<iframe id="player" type="text/html" width="1000" height="500"
			src="http://www.twitch.tv/' +  $scope.stream + '/embed"
			frameborder="0"></iframe>'

	  		$scope.chat = '<iframe frameborder="0" 
	        scrolling="no" 
	        id="chat_embed" 
	        src="http://www.twitch.tv/'+  $scope.stream + '/chat" 
	        height="500" 
	        width="1000">
			</iframe>'
		} 
		else if($scope.platform == "azubu"){
			$scope.player = '<iframe width="1000" height="500" src="http://www.azubu.tv/azubulink/embed=' + $scope.stream + '"></iframe>';
			$scope.chat = '<iframe height="500" width="1000" src="http://www.azubu.tv/' + $scope.stream + '/chatpopup"></iframe>';
		}
		else{
			$scope.player = "<p>dont mess with url u fuck</p>";
		}

		

		$scope.injectPlayer = function(){
			return $sce.trustAsHtml($scope.player);
		}

		$scope.injectChat = function(){
			return $sce.trustAsHtml($scope.chat);
		}

		// Streams.search('league of legends').success(function(data){
		// 	$scope.results = data.streams;
		// }).error(function(err){

		// });
}]);