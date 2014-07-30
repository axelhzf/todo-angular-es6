require("traceur-runtime");
var angular = require("angular");
require("angular-route");

var app = angular.module("app", ["ngRoute"]);

var EscapeDirective = require("./directives/EscapeDirective");
var FocusDirective = require("./directives/FocusDirective");
var TodoController = require("./controllers/TodoController");

app.controller("TodoController", TodoController);
app.directive("escape", () => {
  return new EscapeDirective();
});
app.directive("focus", ($timeout) => {
  return new FocusDirective($timeout);
});

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    controller: 'TodoController',
    template: require("./templates/todomvc.jade")
  }).when('/:status', {
    controller: 'TodoController',
    template: require("./templates/todomvc.jade")
  }).otherwise({
    redirectTo: '/'
  });
});


