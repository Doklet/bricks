'use strict';

angular.module('bricksApp')
  .service('SettingsService', function($http, Client) {

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

    this.saveBrick = function(dataBrick) {

      var docletId = Client.getDocletId();

      var name = dataBrick.name;

      // Save the brick in the bucket brick with the name of the brick as the name
      return $http.put('/api/doclet/' + docletId + '/bucket/brick/' + name, dataBrick);
    };

    this.deleteBrick = function(brick) {

      var docletId = Client.getDocletId();

      var name = brick.data.name;

      // Save the brick in the bucket brick with the name of the brick as the name
      return $http.delete('/api/doclet/' + docletId + '/bucket/brick/' + name);
    };

  });
