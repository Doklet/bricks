'use strict';

angular.module('bricksApp')
  .controller('commentsCtrl', function($scope, Client, CommentService) {

    $scope.comments = undefined;

    $scope.init = function() {

      if ($scope.comments !== undefined) {
        return;
      }

      CommentService.getAll()
        .success(function(mapcomments) {

          var comments = $scope.values(mapcomments);

          Client.setComments(comments);
          $scope.comments = Client.getComments();
        })
        .error(function() {
          $scope.error = 'Failed to fetch comment';
        });
    };

    $scope.init();

    $scope.canDelete = function() {
      return Client.getSession() !== undefined;
    };

    $scope.newComment = function(msg) {

      var d = new Date();

      var comment = {
        user: Client.getUser(),
        created: d.getTime(),
        message: msg
      };

      $scope.msg = undefined;

      CommentService.save(comment)
        .success(function(created) {

          Client.addComment(created);

        })
        .error(function() {
          $scope.error = 'Failed to save comment';
        });

    };

    $scope.deleteComment = function(comment) {

      CommentService.delete(comment)
        .success(function(deleted) {

          Client.deleteComment(deleted);

        })
        .error(function() {
          $scope.error = 'Failed to delete comment';
        });
    };

    $scope.hasUser = function() {
      return Client.getUser() !== undefined;
    };

    // TODO move these to a util class, duplicated from main
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

  });

angular.module('bricksApp')
  .directive('comments', function() {
    return {
      controller: 'commentsCtrl',
      templateUrl: 'views/commentsview.html',
      restrict: 'E', // (2)
      replace: true, // (3)
      transclude: true // (4)
    };
  });
