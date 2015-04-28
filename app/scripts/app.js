'use strict';

angular.module('bricksApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'apiMock'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/add_brick', {
        templateUrl: 'views/add_brick.html',
        controller: 'AddBrickCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('bricksApp').config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});