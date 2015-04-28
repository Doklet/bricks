'use strict';


angular.module('bricksApp')
  .service('Client', function() {

    var _sessionId;
    var _docletId;
    var _bricks = [];

    this.reset = function() {
      _sessionId = undefined;
      _bricks = [];
    };

    this.setSessionId = function(sessionId) {
      if (sessionId !== undefined) {
        _sessionId = sessionId;
      }
    };

    this.getSessionId = function() {
      return _sessionId;
    };

    this.setDocletId = function(docletId) {
      if (docletId !== undefined) {
        _docletId = docletId;
      }
    };

    this.getDocletId = function() {
      return _docletId;
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

    this.removeBrick = function(index) {
      _bricks.splice(index, 1);
    };

  });
