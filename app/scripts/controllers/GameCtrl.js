'use strict';

var GameCtrl = function($scope, Status, $location) {
  $scope.cards = [0,0,0,0,0,0,0,0,0];
  $scope.unique = Math.floor((Math.random()*9));
  $scope.cards[$scope.unique] = 1;
  $scope.selects = [];
  $scope.select = function(id) {
  	if ($scope.cards[id] == 1) {
  		Status.setStatus(true);
  		$location.path('/gameover');
  	}

  	if ($scope.selects.length < 2) {
  		if ($scope.selects.indexOf(id) == -1)
  			$scope.selects.push(id);
  	} else {
  		Status.setStatus(false);
  		$location.path('/gameover');
  	}
  }
};

module.exports = GameCtrl;