'use strict';

angular.module('bricksApp')
  .service('CommentService', function($http, rfc4122, Client) {

    this.getAll = function() {

      var docletId = Client.getDocletId();

      return $http.get('/api/doclet/' + docletId + '/bucket/comment');
    };

    this.save = function(comment) {

      var docletId = Client.getDocletId();

      // Generate a id of it dosent exist
      if (comment.id === undefined) {
        comment.id = rfc4122.v4();
      }

      return $http.put('/api/doclet/' + docletId + '/bucket/comment/' + comment.id, comment);
    };

    this.delete = function(comment) {

      var docletId = Client.getDocletId();

      var id = comment.id;

      return $http.delete('/api/doclet/' + docletId + '/bucket/comment/' + id);
    };

  });
