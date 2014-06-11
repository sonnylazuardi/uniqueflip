'use strict';

var angular = require('angular');
var GameCtrl = require('./controllers/GameCtrl');
require('./routes');

var app = angular.module('myApp', ['myApp.routes']);

app.controller('GameCtrl', ['$scope', GameCtrl]);