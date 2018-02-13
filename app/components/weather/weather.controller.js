;(() => {
  'use strict';

  function WeatherController(weatherFactory, imageFactory) {
    this.location;
    this.backdropImage;

    this.$onInit = function() {
      this.location = 'Tokyo';
      this.search(this.location);
    };

    this.search = location => {
      this.location = location;

      weatherFactory.getWeather(this.location).then(weathers => {
        this.weathers = weathers;
      });

      imageFactory.getBackdrop(this.location).then(url => this.backdropImage = url);
    };
  }

  WeatherController.$inject = ['weatherFactory', 'imageFactory'];

  angular
    .module('weatherApp')
    .controller('WeatherController', WeatherController);
})();