'use strict';

var angular = require('angular');
require('angular-route');

angular.module('myApp.routes', ['ngRoute'])

   .config(['$routeProvider', function($routeProvider) {

      $routeProvider.when('/game', {
         templateUrl: 'views/game.html',
         controller: 'GameCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/game'});
   }]);