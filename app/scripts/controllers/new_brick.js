'use strict';

// Use the same controller for all new brick views
angular.module('bricksApp')
  .controller('NewBrickCtrl', function($scope, $location, Client, SettingsService) {

    $scope.BRICK_TYPE = {
      Text: 'Text',
      Table: 'Table',
      Image: 'Image',
      Chart: 'Chart'
    };

    $scope.brick = {
      name: undefined,
      path: undefined,
      commands: undefined,
      type: undefined
    };

    $scope.add = function() {

      Client.addBrick($scope.brick);

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
