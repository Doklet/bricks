'use strict';

angular.module('bricksApp')
  .service('SettingsService', function($http, rfc4122, Client) {

    this.getBricks = function() {

      var docletId = Client.getDocletId();

      // Get the bricks in the bucket data with the key bricks
      return $http.get('/api/doclet/' + docletId + '/bucket/brick');
      //return $http.get('/api/bricks');
    };

    this.saveBricks = function(bricks) {

      var docletId = Client.getDocletId();

      // Save the bricks in the bucket data with the key bricks
      return $http.put('/api/doclet/' + docletId + '/bucket/data/bricks', bricks);
    };

    this.saveBrick = function(brick) {

      var docletId = Client.getDocletId();

      // Generate a id of it dosent exist
      if (brick.id === undefined) {
        brick.id = rfc4122.v4();
      }

      return $http.put('/api/doclet/' + docletId + '/bucket/brick/' + brick.id, brick);
    };

    this.deleteBrick = function(brick) {

      var docletId = Client.getDocletId();

      var id = brick.data.id;

      // Save the brick in the bucket brick with the name of the brick as the name
      return $http.delete('/api/doclet/' + docletId + '/bucket/brick/' + id);
    };

  });
