'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/app', {templateUrl: 'app/view/app.html', controller: 'AppCtrl'}).
      when('/', {templateUrl: 'app/view/login.html', controller: 'LoginCtrl'}).
      otherwise({redirectTo: 'app/view/login.html'});
}]);

  app.config(function ($httpProvider) {
	 console.log("######@@@@@")
});