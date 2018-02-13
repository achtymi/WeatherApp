;(() => {
  'use strict';

  class WeatherController {
    constructor(weatherFactory, imageFactory) {
      this.weatherFactory = weatherFactory;
      this.imageFactory = imageFactory;

      this.location;
      this.backdropImage;
    };

    $onInit() {
      this.location = 'Havana';
      this.search();
    };

    search() {
      this.weatherFactory.getWeather(this.location).then(weathers => {
        this.weathers = weathers;
      });
      this.imageFactory.getBackdrop(this.location).then(url => this.backdropImage = url);
    };

    onSearch(location) {
      console.log('onSearch()', location);
    }
  }

  WeatherController.$inject = ['weatherFactory', 'imageFactory'];

  angular
    .module('weatherApp')
    .controller('WeatherControllerClass', WeatherController);
})();