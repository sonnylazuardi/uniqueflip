'use strict';

var GameCtrl = function($scope) {
  $scope.cards = [0,0,0,0,0,0,0,0,0];
  $scope.unique = Math.floor((Math.random()*9)+1);

  $scope.cards[$scope.unique] = 1;
};

module.exports = GameCtrl;