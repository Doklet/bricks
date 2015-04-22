'use strict';


angular.module('bricksApp')
  .service('Client', function() {

    var _sessionId;
    var _bricks = [];

    this.reset = function() {
      _sessionId = undefined;
      _bricks = [];
    };

    this.setSessionId = function(sessionId) {
      _sessionId = sessionId;
    };

    this.getSessionId = function() {
      return _sessionId;
    };

    this.setBricks = function(bricks) {
      _bricks = bricks;
    };

    this.getBricks = function() {
      return _bricks;
    };

    this.addBrick = function(brick) {
      _bricks.push(brick);
    };

  });
