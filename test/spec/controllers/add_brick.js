'use strict';

describe('Controller: AddBrickCtrl', function () {

  // load the controller's module
  beforeEach(module('bricksApp'));

  var AddBrickCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddBrickCtrl = $controller('AddBrickCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
