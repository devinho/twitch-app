var services = angular.module('twitchServices', []);

services.factory('Streams', function($http) {
    var baseUrl = "https://api.twitch.tv/kraken";
    return {
        getStream : function(username){
            return $http.get(baseUrl + "/channels/" + username);
        },
        searchMany: function(value){
            return $http.get(baseUrl + "/streams?limit=100&game="+value); //max 100
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

services.factory('Search', function($http) {
    var baseUrl = "https://api.twitch.tv/kraken";
    searchStream : function(search) {
        return $http.get(baseUrl + "/search/streams?q=" + search);
    },
    searchGame : function(search) {
        return $http.get(baseUrl + "/search/games?type=suggest&q=" + search);
    }
});
