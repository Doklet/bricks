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

    // The name of the brick
    $scope.name = 'Bricks';

    // The type of bricks
    $scope.BRICK_TYPE = {
      Text: 'Text',
      Table: 'Table',
      Image: 'Image',
      Chart: 'Chart'
    };

    $scope.keys = function(obj) {
      return obj ? Object.keys(obj) : [];
    };

    $scope.values = function(obj) {
      var values = [];
      var keys = $scope.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        values.push(obj[key]);
      }

      return values;
    };

    $scope.init = function() {

      // Save doclet id, name and session id in client.
      var docletId = $location.search().docletId;
      if (docletId !== undefined) {
        Client.setDocletId($window.unescape(docletId));
      }

      var sessionId = $location.search().token;
      if (sessionId !== undefined) {
        Client.setSessionId($window.unescape(sessionId));
      }

      var docletName = $location.search().docletName;
      if (docletName !== undefined) {
        Client.setName(docletName);
      }
      $scope.name = Client.getName();


      if (!Client.hasBricks()) {

        // Show the loading div
        $scope.state = $scope.SETTINGS_STATE.Loading;

        SettingsService.getBricks()
          .success(function(brickDTOs) {

            //$scope.bricks = $scope.createRuntimeBricks(dataBricks);

            Client.setBricks($scope.values(brickDTOs));

            $scope.bricks = Client.getBricks();

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

      } else {
        $scope.bricks = Client.getBricks();
        $scope.state = $scope.SETTINGS_STATE.Completed;
      }

    };

    // Invoke init to fetch the needed data
    $scope.init();

    $scope.reloadContent = function(brick) {

      brick.state = $scope.BRICK_STATE.Loading;

      // If this is a image no need to run any pipe, just return here
      if (brick.data.type === $scope.BRICK_TYPE.Image) {
        brick.state = $scope.BRICK_STATE.Completed;
        return;
      }

      PipeService.run(brick.data.commands, brick.data.path)
        .success(function(content) {
          brick.state = $scope.BRICK_STATE.Completed;

          brick.content = content;
        })
        .error(function(response) {
          brick.state = $scope.BRICK_STATE.Completed;

          brick.content = response;
        });
    };

    $scope.imagePathOfBrick = function(brick) {
      return '/api/file/' + brick.data.path + '?token=' + Client.getSessionId();
    };

  });
