'use strict';

var GameoverCtrl = function($scope, Status, $location) {
  $scope.status = Status.getStatus();
};

module.exports = GameoverCtrl;