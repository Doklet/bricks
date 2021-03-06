'use strict';

angular.module('bricksApp')
  .controller('SettingsCtrl', function($scope, $location, Client, SettingsService) {

    $scope.bricks = Client.getBricks();
    $scope.name = Client.getName();

    $scope.add = function() {
      $location.path('/add_brick');
    };

    $scope.done = function() {
      $location.path('/');
    };

    $scope.remove = function(brick) {

      SettingsService.deleteBrick(brick)
        .success(function() {
          // Remove brick
          Client.removeBrick(brick);
        })
        .error(function() {
          $scope.error = 'Failed to delete bricks';
        });
    };

    $scope.edit = function(brick) {
      brick.$edit = true;
      brick.$name = brick.data.name;
      brick.$description = brick.data.description;
    };

    $scope.update = function(brick) {
      brick.data.name = brick.$name;
      brick.data.description = brick.$description;
      brick.$edit = false;

      SettingsService.saveBrick(brick.data)
        .success(function() {
          // TODO show info here
        })
        .error(function() {
          $scope.error = 'Failed to delete bricks';
        });
    };

    $scope.cancel = function(brick) {
      brick.$edit = false;
    };

  });
