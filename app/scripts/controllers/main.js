'use strict';


angular.module('bricksApp')
  .controller('MainCtrl', function($scope, Client, SettingsService) {

    // The state of the progress of setting up the bricks
    $scope.SETTINGS_STATE = {
      // Loading from server
      Loading: 0,
      // No bricks has been added
      NoBricksAvailable: 1,
      // The bricks has been added
      Completed: 2
    };

    // The type of bricks
    $scope.BRICK_TYPE = {
      File: 'File'
    };

    $scope.bricks = [{
      name: 'FileBrick',
      type: $scope.BRICK_TYPE.File,
      path: 'Server1/root/path',
      content: 'Here is text from the file'
    }, {
      name: 'FileBrick1',
      type: $scope.BRICK_TYPE.File,
      path: 'Server1/root/path/2',
      content: 'Here is text from the file from another'
    }];

    Client.setBricks($scope.bricks);

    $scope.init = function() {

      SettingsService.getBricks()
        .success(function(bricks) {

          Client.setBricks(bricks);

          $scope.bricks = bricks;
        })
        .error(function(response, status) {
          // The first time there is no saved settings, so a 404 is expected here
          if (status === 404) {
            // Expected
            $scope.state = $scope.SETTINGS_STATE.NoBricksAvailable;
          } else {
            $scope.error = 'Failed to fetch bricks';
          }
        });

    };

    // Invoke init to fetch the needed data
    $scope.init();

  });
