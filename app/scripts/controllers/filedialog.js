'use strict';

angular.module('bricksApp')
  .controller('FiledialogCtrl', function($scope, $element, close, AccountService, dialogType, dialogTitle) {

    var DialogType = {
      file: 'file',
      folder: 'folder'
    };

    $scope.fileinfos = [];
    $scope.accounts = [];

    $scope.type = dialogType;
    $scope.title = dialogTitle;

    $scope.selected = {
      account: undefined,
      file: undefined
    };

    $scope.breadcrumbPath = [{
      name: 'Account',
      accountId: undefined,
      path: undefined
    }];

    AccountService.getAll()
      .success(function(accounts) {
        $scope.accounts = accounts;
      })
      .error(function() {
        $scope.info = undefined;
        $scope.error = 'Failed to fetch accounts';
      });

    $scope.breadcrumbPathSelected = function(breadcrumbPath) {
      // If the accountId is not set we go to Home
      if (breadcrumbPath.accountId === undefined) {

        $scope.breadcrumbPath = [{
          name: 'Account',
          accountId: undefined,
          path: undefined
        }];

      } else {
        // Set correct breadcrumb path
        var index = $scope.breadcrumbPath.indexOf(breadcrumbPath);
        $scope.breadcrumbPath = $scope.breadcrumbPath.splice(0, index + 1);
        // Clear the current fileinfos list
        $scope.fileinfos = undefined;
        // Load the fileinfo for the account and path
        AccountService.fetchFileinfo(breadcrumbPath.accountId, breadcrumbPath.path)
          .success(function(files) {
            $scope.fileinfos = files;
          })
          .error(function() {
            $scope.fileinfos = [];
            $scope.info = undefined;
            $scope.error = 'Failed to fetch fileinfo';
          });
      }
    };

    $scope.accountSelected = function(account) {
      $scope.selected.account = account;

      var part = {
        name: account.name,
        accountId: account.id,
        path: '/'
      };

      $scope.breadcrumbPath = [{
        name: 'Account',
        accountId: undefined,
        path: undefined
      }, part];

      $scope.breadcrumbPathSelected(part);
    };

    $scope.fileSelected = function(selectedFile) {

      if (selectedFile.isDir === true) {
        // Clear the current fileinfos list
        $scope.fileinfos = undefined;
        // Load the fileinfo for the account and path
        AccountService.fetchFileinfo($scope.selected.account.id, selectedFile.path)
          .success(function(files) {
            $scope.fileinfos = files;

            $scope.breadcrumbPath.push({
              name: selectedFile.name,
              accountId: $scope.selected.account.id,
              path: selectedFile.path
            });
          })
          .error(function() {
            $scope.info = undefined;
            $scope.error = 'Failed to fetch fileinfo';
          });

        // Set the selected file depending on the dialog type
        if ($scope.type === DialogType.file) {
          $scope.selected.file = undefined;
        } else {
          $scope.selected.file = selectedFile;
        }
      } else {
        // Set the selected file if this is a file dialog
        if ($scope.type === DialogType.file) {
          $scope.selected.file = selectedFile;
        }
      }
    };

    $scope.computeSelectedFilePath = function() {
      if ($scope.selected.account !== undefined && $scope.selected.file !== undefined) {
        return $scope.selected.account.name + $scope.selected.file.path;
      }
    };

    $scope.okClicked = function() {
      var fileSelected = $scope.computeSelectedFilePath();

      //  Manually hide the modal using bootstrap.
      $element.modal('hide');

      close(fileSelected, 200); // close, but give 200ms for bootstrap to animate
    };

  });
