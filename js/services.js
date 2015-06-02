var services = angular.module('twitchServices', []);

services.factory('Streams', function($http) {
    var baseUrl = "https://api.twitch.tv/kraken";
    return {
        getStream : function(username){
            return $http.get(baseUrl + "/channels/" + username);
        },
        searchMany: function(value){
            return $http.get(baseUrl + "/search/streams?type=suggest&limit=50&q="+value); //max 100
        },
        searchFew: function(value){
            return $http.get(baseUrl + "/search/streams?type=suggest&limit=6&q="+value);
        }
    }
});

services.factory('Games', function($http) {
    var baseUrl = "https://api.twitch.tv/kraken";
    return {
        getAll : function(username){
            return $http.get(baseUrl + "/games/top" );
        }
    }
});
