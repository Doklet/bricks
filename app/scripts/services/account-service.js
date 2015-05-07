'use strict';

angular.module('bricksApp')
  .service('AccountService', function AccountService($http) {

    this.getAll = function() {
      return $http.get('/api/account');
    };

    this.fetchFileinfo = function(accountId, path) {
      //return $http.get('/api/' + 'fileinfo' );
      return $http.get('/api/account/' + accountId + '/file_info/' + path);
    };

    this.getFileinfo = function(path) {
      return $http.get('/api/file_info/' + path);
    };

    this.getFile = function(path) {
    	return $http.get('/api/file/' + path);
    };

    this.deleteFile = function(path) {
      return $http.delete('/api/file/' + path);
    };

  });
