'use strict';

angular.module('bricksApp')
  .controller('SettingsCtrl', function($scope, $location, Client) {

    $scope.bricks = Client.getBricks();

    $scope.add = function() {
      $location.path('/add_brick');
    };

  });
