'use strict';

var angular = require('angular');
var GameCtrl = require('./controllers/GameCtrl');
var GameoverCtrl = require('./controllers/GameoverCtrl');
var Status = require('./services/Status');
require('./routes');

var app = angular.module('myApp', ['myApp.routes']);
app.controller('GameCtrl', GameCtrl);
app.controller('GameoverCtrl', GameoverCtrl);
app.factory('Status', Status);