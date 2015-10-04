'use strict';

angular.module('wssApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'gettext',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }).run(function(gettextCatalog) {
      gettextCatalog.currentLanguage = 'fr';
      gettextCatalog.debug = true;
    });
