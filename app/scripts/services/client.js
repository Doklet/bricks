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

    var _name;
    var _sessionId;
    var _docletId;
    var _bricks;

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
      if (_bricks === undefined) {
        _bricks = undefined;
      }

      _bricks.push(this.createRuntimeBrick(brickDTO));
    };

    this.removeBrick = function(index) {
      _bricks.splice(index, 1);
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
        content: []
      };

      return brick;
    };

  });
