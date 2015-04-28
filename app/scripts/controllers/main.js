'use strict';


angular.module('bricksApp')
  .controller('MainCtrl', function($scope, $window, $location, Client, SettingsService, PipeService) {

    // The state of the progress of setting up the bricks
    $scope.SETTINGS_STATE = {
      // Loading from server
      Loading: 0,
      // No bricks has been added
      NoBricksAvailable: 1,
      // The bricks has been added
      Completed: 2
    };

    // The state of the brick
    $scope.BRICK_STATE = {
      // When the brick is just created
      Created: 0,
      // Loading data
      Loading: 1,
      // The brick has loaded its content
      Completed: 2
    };

    // The type of bricks
    $scope.BRICK_TYPE = {
      File: 'File'
    };

    $scope.init = function() {

      // Save doclet id and session id in client.
      var docletId = $location.search().docletId;
      if (docletId !== undefined) {
        Client.setDocletId($window.unescape(docletId));
      }

      var sessionId = $location.search().token;
      if (sessionId !== undefined) {
        Client.setSessionId($window.unescape(sessionId));
      }

      // Show the loading div
      $scope.state = $scope.SETTINGS_STATE.Loading;

      SettingsService.getBricks()
        .success(function(bricks) {

          Client.setBricks(bricks);

          $scope.bricks = $scope.createRuntimeBricks(bricks);

          // Show the normal bricks layout div
          $scope.state = $scope.SETTINGS_STATE.Completed;
        })
        .error(function(response, status) {
          // The first time there is no saved settings, so a 404 is expected here
          if (status === 404) {
            // Show the welcome div since no brick has been created
            $scope.state = $scope.SETTINGS_STATE.NoBricksAvailable;
          } else {
            $scope.error = 'Failed to fetch bricks';
          }
        });

    };

    // Invoke init to fetch the needed data
    $scope.init();

    $scope.createRuntimeBricks = function(dataBricks) {

      var _bricks = [];

      for (var i = 0; i < dataBricks.length; i++) {

        var data = dataBricks[i];
        var brick = {
          data: data,
          state: $scope.BRICK_STATE.Created,
          content: 'Hello'
        };

        _bricks.push(brick);
      }

      return _bricks;
    };

    $scope.reloadContent = function(brick) {

      brick.state = $scope.BRICK_STATE.Loading;

      PipeService.run(undefined, brick.data.path)
        .success(function(content) {
          brick.state = $scope.BRICK_STATE.Completed;

          brick.content = content;
        })
        .error(function(response) {
          brick.state = $scope.BRICK_STATE.Completed;

          brick.content = response;
        });
    };


  });
