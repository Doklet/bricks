'use strict';

angular.module('bricksApp')
  .controller('commentsCtrl', function($scope) {

    $scope.message = undefined;

    $scope.comments = [];

    $scope.comment = function() {

      var com = {
        user: 'Adam',
        brick: 'MyBrick',
        created: '2015-10-12',
        message: $scope.message
      };

      $scope.message = undefined;

      $scope.comments.push(com);
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
