'use strict';

var wssApp = angular.module('wssApp', [
  'ngCookies',
  'ngRoute',
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'gettext',
  'ui.bootstrap'
  ])
.config(['$routeProvider','$locationProvider', function ( $routeProvider,$locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
  .when('/', {
    templateUrl: 'partials/accueil.html',
    controller : 'MainCtrl'
  })
  .when('/mainMenu/:language?', {
    templateUrl: 'partials/mainMenu.html',
    controller: 'MainCtrl'
  }).when('/page/oeuvre:nameOeuvre*', {
    templateUrl: function(urlattr){
      return 'partials/oeuvre/'+ urlattr.nameOeuvre +  '.html';
    },
    controller: 'MainCtrl'
  }).when('/page/homme/:nameHomme*', {
    templateUrl: function(urlattr){
      return 'partials/homme/'+ urlattr.nameHomme +  '.html';
    },
    controller: 'MainCtrl'
  }).when('/show/:name*', {
    templateUrl: 'partials/slideShow.html',
    controller: 'SliderController'
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
    var menuColor = 'menuWhite'
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
    this.getMenuColor = function() {
      return menuColor;
    };
    this.setMenuColor = function(bool) {
      menuColor = bool;
    };
  }
  ]);

wssApp.controller('MainCtrl', ['$scope','$routeParams', 'menuService' ,'gettextCatalog' , '$http',
  function($scope, $routeParams, menuService, gettextCatalog, $http){




    $scope.expos = {};

    $http({
      method: 'GET',
      url: '/assets/expo.json'
    })
    .success(function (data, status, headers, config) {

      $scope.expos =  data.expo;
      console.log(status);
    })
    .error(function (data, status, headers, config) {

    });


    $scope.ColorMenu  = "menuWhite";

    if($routeParams.language !== undefined){
      menuService.setShowMenu(true); 
      menuService.setLanguage($routeParams.language);
      gettextCatalog.setCurrentLanguage(menuService.getLanguage()); 
      
    }  
    if($routeParams.nameOeuvre !== undefined){
      console.log('oeuvre');
      menuService.setMenuColor("menuWhite");
      menuService.setShowMenu(true);
      menuService.setShowIsaac(true); 
      gettextCatalog.setCurrentLanguage(menuService.getLanguage()); 
      
      
    }
    if($routeParams.nameHomme !== undefined){
      console.log('homme');
      menuService.setMenuColor("menuBlack");
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
    $scope.getColorMenu = function () {
      return menuService.getMenuColor();      
    };

    $scope.langague = $routeParams.language;
    
    
  }
  ]);

wssApp.factory('SlideShowService', function ($http) {
  return {
    get: function () {
      return angular.fromJson($http.get('/assets/slide.json'));
    }
  };
});

wssApp.factory('ExpositionService', function ($http) {
  return {
    get: function () {
      return angular.fromJson($http.get('/assets/expo.json'));
    }
  };
});

wssApp.controller('SliderController',['$scope','$routeParams', 'SlideShowService', '$http', function(sc, $routeParams, ExpositionService , SlideShowService, $http) {



  if($routeParams.name = "memoire/gravee"){
    sc.images = [{
      src: '/memoire/gravee/1.jpg',
      title: 'Titre img 1',
      annee:'1987-1988',
      type:'gravure, eau-forte',
      dimension:'40x50cm',
      categorie:'LA MEMOIRE GRAVEE'
    }, {
      src: 'memoire/gravee/2.jpg',
      title: 'Titre img 2',
      annee:'1987-1988',
      type:'gravure, eau-forte',
      dimension:'40x50cm',
      categorie:'LA MEMOIRE GRAVEE'

    }, {
      src: 'memoire/gravee/3.jpg',
      title: 'Titre img 3',
      annee:'1987-1988',
      type:'gravure, eau-forte',
      dimension:'40x50cm',
      categorie:'LA MEMOIRE GRAVEE'
    }, {
      src: 'memoire/gravee/4.jpg',
      title: 'Titre img 4',
      annee:'1987-1988',
      type:'gravure, eau-forte',
      dimension:'40x50cm',
      categorie:'LA MEMOIRE GRAVEE'
    }];

    console.log(sc.images);
  }


}]);

wssApp.directive('slider', function($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      images: '='
    },
    link: function(scope, elem, attrs) {
      scope.currentIndex = 0; // Initially the index is at the first image

      scope.next = function() {
        scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
      };

      scope.prev = function() {
        scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
      };

      scope.$watch('currentIndex', function() {

        scope.images.forEach(function(image) {
         image.visible = false; // make every image invisible
       });
        scope.images[scope.currentIndex].visible = true; // make the current image visible

      });

    },
    templateUrl: 'partials/templateurl.html'
  };
});



