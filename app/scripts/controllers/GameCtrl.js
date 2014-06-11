'use strict';

var GameCtrl = function($scope) {
  $scope.cards = [0,0,0,0,0,0,0,0,0];
  $scope.unique = Math.floor((Math.random()*9));
  $scope.cards[$scope.unique] = 1;
  $scope.selects = [];
  $scope.select = function(id) {
  	$scope.selects.push(id);
  }
};

module.exports = GameCtrl;