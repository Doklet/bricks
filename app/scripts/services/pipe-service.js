'use strict';

angular.module('bricksApp')
  .service('PipeService', function($http) {

    this.run = function(commands, inputFile) {
      var args = '';
      var input = '';

      if (commands !== undefined) {
        args += 'pipe=' + commands;
      } else {
        args += 'pipe=echo';
      }

      if (inputFile !== undefined) {
        args += '&input=' + inputFile;
      }

      return $http.post('/api/pipe/run?' + args, input);
    };

  });
