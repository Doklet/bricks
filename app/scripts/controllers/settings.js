'use strict';

angular.module('bricksApp')
  .controller('SettingsCtrl', function($scope, $location, Client, SettingsService) {

    $scope.bricks = Client.getBricks();

    $scope.add = function() {
      $location.path('/add_brick');
    };

    $scope.done = function() {
      SettingsService.saveBricks(Client.getBricks())
        .success(function() {
          $location.path('/');
        })
        .error(function() {
          $scope.error = 'Failed to save bricks';
        });
    };

    $scope.remove = function(index) {
      Client.removeBrick(index);
    };

  });
