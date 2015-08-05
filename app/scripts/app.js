'use strict';

angular.module('bricksApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'apiMock',
    'angularModalService',
    'highcharts-ng',
    'uuid'
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
      .when('/new_text_brick', {
        templateUrl: 'views/new_text_brick.html',
        controller: 'NewBrickCtrl'
      })
      .when('/new_table_brick', {
        templateUrl: 'views/new_table_brick.html',
        controller: 'NewBrickCtrl'
      })
      .when('/new_image_brick', {
        templateUrl: 'views/new_image_brick.html',
        controller: 'NewBrickCtrl'
      })
      .when('/new_chart_brick', {
        templateUrl: 'views/new_chart_brick.html',
        controller: 'NewBrickCtrl'
      })
    .when('/unauthorized', {
      templateUrl: 'views/unauthorized.html',
      controller: 'UnauthorizedCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  });

angular.module('bricksApp').config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
