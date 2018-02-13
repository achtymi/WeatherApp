;(() => {
  'use strict';

  let locationStored = '';
  let locationData = '';

  function WeatherFactory($http) {
    return {
      getWeather: getWeather
    };

    function getWeather(location) {
      return fetchWeather(location).then(
        success => success.list.map(mapWeatherData),
        fail => fail
      );
    }

    function fetchWeather(location = '') {
      if (location === locationStored) {
        return Promise.resolve(locationData.data);
      }

      const config = {
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily/',
        params: {
          APPID: 'f835b842f5b7d25caa4c0157018b90fe',
          q: location
        }
      };

      return $http(config).then(
        success => {
          locationStored = location;
          locationData = success;
          return success.data;
        },
        fail => fail.data
      );
    }

    function mapWeatherData(day) {
      return {
        date: convertTimestampToDate(day.dt),
        max: convertKelvinToCelcius(day.temp.max),
        min: convertKelvinToCelcius(day.temp.min),
        desc: day.weather[0].main
      };
    }

    function convertTimestampToDate(timestamp) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const date = new Date(timestamp * 1000);
      return days[date.getDay()];
    }

    function convertKelvinToCelcius(kelvin) {
      return Math.round(kelvin - 273.15);
    }
  }

  angular
    .module('weatherApp')
    .factory('weatherFactory', ['$http', WeatherFactory]);
})();