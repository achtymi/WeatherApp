;(() => {
  'use strict';

  angular
    .module('weatherApp')
    .component('backdrop', {
      bindings: {
        imageUrl: '<'
      },
      templateUrl: 'components/backdrop/backdrop.template.html'
    });
})();