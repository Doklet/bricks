'use strict';

angular.module('bricksApp')
  .service('SettingsService', function($http, Client) {

    this.getBricks = function() {

      var docletId = Client.getDocletId();

      // Get the bricks in the bucket data with the key bricks
      return $http.get('/api/doclet/' + docletId + '/bucket/data/bricks');
      //return $http.get('/api/bricks');
    };

    this.saveBricks = function(bricks) {

      var docletId = Client.getDocletId();

      // Save the bricks in the bucket data with the key bricks
      return $http.put('/api/doclet/' + docletId + '/bucket/data/bricks', bricks);
    };

  });
