;(() => {
  'use strict';

  angular
    .module('weatherApp')
    .component('tile', {
      bindings: {
        weather: '<'
      },
      templateUrl: 'components/tile/tile.template.html'
    });
})();