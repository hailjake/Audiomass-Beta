'use strict';

angular.module('nextGenApp')
  .directive('navbar', function () {
    return {
      restrict: 'E',
      templateUrl: 'navbar.html',
      controller: 'NavbarCtrl',
    };
  });