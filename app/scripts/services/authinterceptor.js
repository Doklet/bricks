'use strict';

angular.module('bricksApp')
  .factory('AuthInterceptor', function($rootScope, $q, $log, $location, $window, Client) {

    return {
      request: function(config) {
        config.headers = config.headers || {};

        var token = Client.getSessionId('Token');
        if (token) {
          config.headers.Authorization = 'Token ' + token;
        }

        var docletId = Client.getDocletId();
        if (docletId) {
          config.headers.SkyraidId = docletId;
        }

        return config;
      },

      responseError: function(response) {
        // handle the case where the user is not authenticated
        if (response.status === 401) {

          if ($location.search().authUrl !== undefined) {

            // Fetch the authUrl from the parameters
            var authUrl = $window.unescape($location.search().authUrl);

            // redirect user to signin form 
            $window.top.location = authUrl;
          }
        }
        return $q.reject(response);
      }
    };
  });
