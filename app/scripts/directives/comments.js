'use strict';

angular.module('bricksApp')
  .controller('commentsCtrl', function($scope, Client, CommentService) {

    $scope.message = undefined;
    $scope.comments = undefined;

    $scope.init = function() {

      if ($scope.comments !== undefined) {
        return;
      }

      CommentService.getAll()
        .success(function(comments) {
          Client.setComments(comments);
          $scope.comments = Client.getComments();
        })
        .error(function() {
          $scope.error = 'Failed to fetch comment';
        });
    };

    $scope.init();

    $scope.newComment = function() {

      var comment = {
        user: 'Adam',
        brick: 'MyBrick',
        created: '2015-10-12',
        message: $scope.message
      };

      $scope.message = undefined;

      CommentService.save(comment)
        .success(function(created) {

          Client.addComment(created);

        })
        .error(function() {
          $scope.error = 'Failed to save comment';
        });
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
