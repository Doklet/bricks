'use strict';

describe('Controller: NewTextBrickCtrl', function () {

  // load the controller's module
  beforeEach(module('bricksApp'));

  var NewTextBrickCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewTextBrickCtrl = $controller('NewTextBrickCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
