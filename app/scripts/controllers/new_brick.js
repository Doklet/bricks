'use strict';

// Use the same controller for all new brick views
angular.module('bricksApp')
  .controller('NewBrickCtrl', function($scope, $location, ModalService, Client, SettingsService) {

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

    $scope.name = Client.getName();

    $scope.add = function() {

      SettingsService.saveBrick($scope.brick)
        .success(function(brickDTO) {
          // Create a runtime brick here then add it to the client
          Client.addBrick(brickDTO);
          $location.path('/settings');
        })
        .error(function() {
          $scope.error = 'Failed to save brick';
        });
    };

    $scope.cancel = function() {
      $location.path('/settings');
    };

    $scope.browseFile = function() {
      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: 'views/filedialog.html',
        controller: 'FiledialogCtrl',
        inputs: {
          dialogType: 'file',
          dialogTitle: 'Select file'
        }
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        modal.close.then(function(absfilename) {

          $scope.brick.path = absfilename;
        });
      });
    };

  });
