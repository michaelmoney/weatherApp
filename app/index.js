'use strict';

var weatherApp = angular.module('weatherApp', []);

weatherApp.directive('weatherApp', ['$http', '$httpParamSerializer', function ($http, $httpParamSerializer) {
    return {
        restrict: 'E',
        templateUrl: './weather-template.html',
        scope: true,
        link: function(scope, elem, attr) {
            scope.title = 'iWeather 0.0.1';
            var getWeather = function (city, cc, lang, units) {
                if (!city || !cc) {
                    return console.error('City & CC missing...');
                }
                var url, params = $httpParamSerializer({
                    q: city + ',' + cc,
                    APPID: '6618cb01c3501a12296501fb525edd96',
                    lang: lang,
                    units: units
                });
                url = 'http://api.openweathermap.org/data/2.5/weather';
                url += '?';
                url += params;
                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    console.log('Weather received!');
                    var data = response.data;
                    scope.weather = {
                        humidity: data.main.humidity,
                        pressure: data.main.pressure,
                        temp: data.main.temp,
                        tempMax: data.main.temp_max,
                        tempMin: data.main.temp_min,
                        city: data.name,
                        icon: data.weather[0].icon,
                        description: data.weather[0].description,
                        cc: data.sys.country
                    };
                }, function errorCallback(response) {
                    console.log('Oh crap! Error:', response);
                });
            };

            getWeather('Warsaw', 'pl', 'pl', 'metric');


        }
    };
}]);
