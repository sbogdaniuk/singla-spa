import angular from "angular";

const app = angular.module("legacyApp", []);

app.controller("MainCtrl", function ($scope) {
  $scope.message = "Hello from AngularJS!";
});

export default app;
