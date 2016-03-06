'use strict';

var weatherApp = angular.module('weatherApp', []);

weatherApp.directive('weatherApp', function () {
    return {
        restrict: 'E',
        templateUrl: './weather-template.html',
        scope: true,
        link: function(scope, elem, attr) {
            scope.title = 'iWeather 0.0.1';
        }
    };
});
