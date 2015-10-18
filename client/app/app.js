'use strict';

var wssApp = angular.module('wssApp', [
  'ngCookies',
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'gettext',
  'ui.bootstrap'
  ])
.config(['$routeProvider', function ( $routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/accueil.html',
    controller : 'MainCtrl'
  })
  .when('/mainMenu/:language?', {
    templateUrl: 'partials/mainMenu.html',
    controller: 'MainCtrl'
  }).when('/page/:name*', {
    templateUrl: function(urlattr){
      return 'partials/'+ urlattr.name +  '.html';
    },
    controller: 'MainCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });

}]).run(function(gettextCatalog) {
  gettextCatalog.currentLanguage = 'fr';
  gettextCatalog.debug = true;
});


wssApp.service("menuService", [
  function() {
    var showMenu = false;
    var showIsaac = false;
    var language = 'fr';
    this.getLanguage = function() {
      return language;
    };
    this.setLanguage= function(string) {
      language = string;
    };
    this.getShowIsaac = function() {
      return showIsaac;
    };
    this.setShowIsaac = function(bool) {
      showIsaac = bool;
    };
    this.getShowMenu = function() {
      return showMenu;
    };
    this.setShowMenu = function(bool) {
      showMenu = bool;
    };
  }
  ]);

wssApp.controller('MainCtrl', ['$scope','$routeParams', 'menuService' ,'gettextCatalog' ,
  function($scope, $routeParams, menuService, gettextCatalog){
    if($routeParams.language !== undefined){
      menuService.setShowMenu(true); 
      menuService.setLanguage($routeParams.language);
      gettextCatalog.setCurrentLanguage(menuService.getLanguage()); 
      console.log('menu');
    }  
    if($routeParams.name !== undefined){
      menuService.setShowMenu(true);
      menuService.setShowIsaac(true); 
      gettextCatalog.setCurrentLanguage(menuService.getLanguage()); 
    }

    $scope.showIsaac = function () {
      return menuService.getShowIsaac();      
    };
    $scope.showMenu = function () {
      return menuService.getShowMenu();      
    };

    $scope.langague = $routeParams.language;
    
  }
  ]);



