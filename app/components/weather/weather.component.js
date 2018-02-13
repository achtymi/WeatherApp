;(() => {
  'use strict';

  angular
    .module('weatherApp')
    .component('weather', {
      templateUrl: 'components/weather/weather.template.html',
      controller: 'WeatherController'
    });
})();