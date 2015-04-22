'use strict';

angular.module('bricksApp')
  .controller('AddBrickCtrl', function($scope, $location, Client) {

    $scope.fileBrick = {
      name: undefined,
      path: undefined
    };

    $scope.add = function() {
      Client.addBrick($scope.fileBrick);
    };

    $scope.cancel = function() {
      $location.path('/settings');
    };

  });
