'use strict';


angular.module('bricksApp')
  .factory('BrickFactory', function() {

    /**
     * Constructor, with class name
     */
    function Brick(data) {
      // Public properties, assigned to the instance ('this')
      this.data = data;
      this.content = undefined;
    }

    Brick.prototype.getName = function() {
      return this.data.name;
    };    

    Brick.prototype.getPath = function() {
      return this.data.path;
    };

    /**
     * Public method, assigned to prototype
     */
    Brick.prototype.refresh = function() {
      this.content = 'hello world';
    };

    /**
     * Return the constructor function
     */
    return Brick;
  });
