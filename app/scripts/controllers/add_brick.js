'use strict';

angular.module('bricksApp')
  .controller('AddBrickCtrl', function($scope, $location, Client, SettingsService) {

    var BRICK_TYPE = {
      File: 'File'
    };

    $scope.fileBrick = {
      name: undefined,
      path: undefined,
      type: BRICK_TYPE.File
    };

    $scope.add = function() {

      Client.addBrick($scope.fileBrick);

      SettingsService.saveBricks(Client.getBricks())
        .success(function() {
          $location.path('/settings');
        })
        .error(function() {
          $scope.error = 'Failed to save bricks';
        });
    };

    $scope.cancel = function() {
      $location.path('/settings');
    };

  });
