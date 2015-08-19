'use strict';


angular.module('bricksApp')
  .service('Client', function() {

    // The state of the brick
    // TODO should be moved to Const service
    var BRICK_STATE = {
      // When the brick is just created
      Created: 0,
      // Loading data
      Loading: 1,
      // The brick has loaded its content
      Completed: 2
    };

    // The modes this app
    var MODES = {
      // Only view is allowed
      View: 0,
      // Allowed to perform edit, launched by the owner
      Edit: 1
    };

    var _name;
    var _sessionId;
    var _docletId;
    var _bricks;
    var _comments;

    this.reset = function() {
      _sessionId = undefined;
      _bricks = [];
    };

    this.setName = function(name) {
      if (name !== undefined) {
        _name = name;
      }
    };

    this.getName = function() {
      return _name;
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

    this.setBricks = function(bricksDTO) {
      _bricks = this.createRuntimeBricks(bricksDTO);
    };

    this.hasBricks = function() {
      return _bricks !== undefined;
    };

    this.getBricks = function() {
      return _bricks;
    };

    this.addBrick = function(brickDTO) {
      var brick =  this.createRuntimeBrick(brickDTO);

      _bricks.push(brick);

      return brick;
    };

    this.removeBrick = function(brickToRemove) {
      for (var i = 0; i < _bricks.length; i++) {
        if (brickToRemove.data.id === _bricks[i].data.id) {
          _bricks.splice(i, 1);
          return;
        }
      }
    };

    this.createRuntimeBricks = function(bricksDTO) {

      var _bricks = [];

      for (var i = 0; i < bricksDTO.length; i++) {

        var dto = bricksDTO[i];
        var brick = this.createRuntimeBrick(dto);

        _bricks.push(brick);
      }

      return _bricks;
    };

    this.createRuntimeBrick = function(brickDTO) {
      var brick = {
        data: brickDTO,
        state: BRICK_STATE.Created,
        mode: MODES.View,
        content: []
      };

      return brick;
    };

    this.getComments = function() {
      return _comments;
    };

    this.setComments = function(comments) {
      _comments = comments;
    };

    this.addComment = function(comment) {
      _comments.push(comment);
    };

  });
