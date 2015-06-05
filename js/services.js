var services = angular.module('twitchServices', []);

services.factory('Streams', function($http) {
    var baseUrl = "https://api.twitch.tv/kraken";
    return {
        getStream : function(username){
            return $http.get(baseUrl + "/channels/" + username);
        },
        searchMany: function(value){
            return $http.get(baseUrl + "/streams?limit=100&game="+value); //max 100
            // https://api.twitch.tv/kraken/streams?limit=100&game=league of legends
        },
        searchFew: function(value){
            return $http.get(baseUrl + "/streams?limit=6&game="+value);
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

services.factory('streamsAzubu', function($http) {
    var baseUrl = "http://api.azubu.tv";
    return {
        getLive : function(game) {
            return $http.get(baseUrl + "/public/channel/live/list/game/" + game);
        }
    }
});
