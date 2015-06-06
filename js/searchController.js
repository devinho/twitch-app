twitchControllers.controller('searchController',  ['$scope', 'Streams', '$routeParams', 'streamsAzubu', function($scope, Streams, $routeParams, streamsAzubu){
	$scope.search = $routeParams.q;
}]);