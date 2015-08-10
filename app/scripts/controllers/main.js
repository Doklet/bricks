'use strict';

angular.module('bricksApp')
  .controller('MainCtrl', function($scope, $window, $location, Client, SettingsService, PipeService, ModalService) {

    // The modes this app
    $scope.MODES = {
      // Only view is allowed
      View: 0,
      // Allowed to perform edit, launched by the owner
      Edit: 1
    };

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

    $scope.RIGHTSIDE_VIEWS = {
      Templates: 0, 
      Comments: 1
    };

    // The type of bricks
    $scope.BRICK_TYPE = {
      Text: 'Text',
      Table: 'Table',
      Image: 'Image',
      Chart: 'Chart'
    };

    $scope.BRICK_TEMPLATES = [{
      name: 'Text file',
      type: $scope.BRICK_TYPE.Text,
      description: 'Add a text file'
    }, {
      name: 'Image file',
      type: $scope.BRICK_TYPE.Image,
      description: 'Add a image file'
    }, {
      name: 'CSV File',
      type: $scope.BRICK_TYPE.Table,
      commands: 'csv',
      description: 'Add a csv file'
    }];


    // Default properties
    $scope.name = 'Bricks';
    $scope.mode = $scope.MODES.View;
    $scope.rightView = $scope.RIGHTSIDE_VIEWS.Templates;

    $scope.showTemplates = function() {
      $scope.rightView = $scope.RIGHTSIDE_VIEWS.Templates;      
    };

    $scope.showComments = function() {
      $scope.rightView = $scope.RIGHTSIDE_VIEWS.Comments;      
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

      // If there is a session set in edit mode
      if (Client.getSessionId() !== undefined) {
        $scope.mode = $scope.MODES.Edit;
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

            // Reload all the bricks
            $scope.reloadAllContent($scope.bricks);

          })
          .error(function(response, status) {
            // The first time there is no saved settings, so a 404 is expected here
            if (status === 404) {
              // Show the welcome div since no brick has been created
              $scope.state = $scope.SETTINGS_STATE.NoBricksAvailable;
            } else if (status === 401) {
              $location.path('/unauthorized');
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

    $scope.reloadAllContent = function(bricks) {
      // Reload the content of all the bricks
      for (var i = 0; i < bricks.length; i++) {
        // Fetch the brick
        var brick = bricks[i];
        // Reload the content
        $scope.reloadContent(brick);
      }
    };

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

      if (Client.getSessionId() !== undefined) {
        return '/api/file/' + brick.data.path + '?token=' + Client.getSessionId();
      } else if (Client.getDocletId() !== undefined) {
        return '/api/file/' + brick.data.path + '?SkyraidId=' + Client.getDocletId();
      }

      return '/api/file/' + brick.data.path;
    };

    $scope.edit = function(brick) {
      brick.mode = $scope.MODES.Edit;

      $scope.editingBrick = brick;

      brick.$type = brick.data.type;
      brick.$name = brick.data.name;
      brick.$path = brick.data.path;
      brick.$commands = brick.data.commands;
      brick.$description = brick.data.description;
    };

    $scope.cancel = function(brick) {
      brick.mode = $scope.MODES.View;

      $scope.editingBrick = undefined;

      brick.$type = undefined;
      brick.$name = undefined;
      brick.$path = undefined;
      brick.$commands = undefined;
      brick.$description = undefined;
    };

    $scope.update = function(brick) {
      brick.mode = $scope.MODES.View;

      $scope.editingBrick = undefined;

      brick.data.name = brick.$name;
      brick.data.path = brick.$path;
      brick.data.description = brick.$description;
      brick.data.commands = brick.$commands;

      SettingsService.saveBrick(brick.data)
        .success(function() {
          // TODO show info here
        })
        .error(function() {
          $scope.error = 'Failed to save brick';
        });
    };

    $scope.remove = function(brick) {

      SettingsService.deleteBrick(brick)
        .success(function() {

          Client.removeBrick(brick);
        })
        .error(function() {
          $scope.error = 'Failed to delete bricks';
        });
    };

    $scope.addFromTemplate = function(template) {

      // Create a new brick
      var toCreate = {
        type: template.type,
        name: 'New ' + template.type,
        commands: template.commands
      };

      // Save the brick
      SettingsService.saveBrick(toCreate)
        .success(function(data) {
          var createdBrick = Client.addBrick(data);

          $scope.edit(createdBrick);
        })
        .error(function() {
          $scope.error = 'Failed to save brick';
        });
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

          $scope.editingBrick.$path = absfilename;
        });
      });
    };

  });
