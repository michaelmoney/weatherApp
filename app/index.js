'use strict';

var weatherApp = angular.module('weatherApp', []);

weatherApp.directive('weatherApp', ['$http', '$httpParamSerializer', function ($http, $httpParamSerializer) {
    return {
        restrict: 'E',
        templateUrl: './weather-template.html',
        scope: true,
        link: function(scope, elem) {

            function mapPrettyIcons(name) {
                switch(name) {
                    case '01d': return '01-s';
                    case '02d': return '03-s';
                    case '03d': return '04-s';
                    case '04d': return '06-s';
                    case '09d': return '12-s';
                    case '10d': return '14-s';
                    case '01n': return '33-s';
                    case '02n': return '35-s';
                    case '03n': return '38-s';
                    case '04n': return '38-s';
                    case '09n': return '39-s';
                    case '10n': return '39-s';
                    case '11n': return '41-s';
                    case '13d': return '22-s';
                    case '13n': return '44-s';
                    case '013n': return '42-s';
                    case '050d': return '11-s';
                    case '050n': return '11-s';
                    default: return '01-s';
                }
            }

            function refreshValues(data) {
                var prettyIconsUrl = 'https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/' + mapPrettyIcons(data.weather[0].icon) + '.png',
                standardIconsUrl = 'http://openweathermap.org/img/w/' +  data.weather[0].icon + '.png';
                scope.weather = {
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    temp: parseInt(data.main.temp, 10).toString(),
                    tempMax: parseInt(data.main.temp_max,10).toString(),
                    tempMin: parseInt(data.main.temp_min, 10).toString(),
                    city: data.name,
                    icon: prettyIconsUrl,
                    description: data.weather[0].description,
                    cc: data.sys.country
                };
            }

            function getWeather (city, cc, lang, units) {
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
                    refreshValues(response.data);
                }, function errorCallback(response) {
                    console.log('Oh crap! Error:', response);
                });
            }

            scope.config = {
                lang: 'pl',
                units: 'metric'
            };


            scope.cities = [
                {
                    name: 'Warsaw',
                    cc: 'pl',
                    isActive: true
                },
                {
                    name: 'Los Angeles',
                    cc: 'us',
                    isActive: false
                },
                {
                    name: 'London',
                    cc: 'uk',
                    isActive: false
                },

                {
                    name: 'New York',
                    cc: 'us',
                    isActive: false
                },
                {
                    name: 'Tokyo',
                    cc: 'jp',
                    isActive: false
                },
                {
                    name: 'Seoul',
                    cc: 'kr',
                    isActive: false
                }
            ];

            scope.selectedIndex = 0;

            scope.next = function() {
                var currIndex = scope.selectedIndex;
                if (currIndex === scope.cities.length - 1) {
                    scope.cities[currIndex].isActive = false;
                    scope.cities[0].isActive = true;
                    scope.selectedIndex = 0;
                } else {
                    scope.cities[currIndex].isActive = false;
                    scope.cities[currIndex + 1].isActive = true;
                    scope.selectedIndex = currIndex + 1;
                }
                getWeather.call(this, scope.cities[scope.selectedIndex].name, scope.cities[scope.selectedIndex].cc, scope.config.lang, scope.config.units);
            };

            scope.prev = function() {
                var currIndex = scope.selectedIndex;
                if (currIndex - 1 < 0 ) {
                    scope.cities[currIndex].isActive = false;
                    scope.cities[scope.cities.length - 1].isActive = true;
                    scope.selectedIndex = scope.cities.length - 1;
                } else {
                    scope.cities[currIndex].isActive = false;
                    scope.cities[currIndex - 1].isActive = true;
                    scope.selectedIndex = currIndex - 1;
                }
                getWeather.call(this, scope.cities[scope.selectedIndex].name, scope.cities[scope.selectedIndex].cc, scope.config.lang, scope.config.units);
            };

            //Initialization
            scope.isMenuVisible = false;
            scope.showMaxMinTemp = true;
            scope.showHumidity = true;
            scope.showPressure = true;
            getWeather.call(this, scope.cities[scope.selectedIndex].name, scope.cities[scope.selectedIndex].cc, scope.config.lang, scope.config.units);
        }
    };
}]);
