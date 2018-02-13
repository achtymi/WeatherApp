;(() => {
  'use strict';

  angular
    .module('weatherApp')
    .component('search', {
      bindings: {
        location: '<',
        onSearch: '&'
      },
      templateUrl: 'components/search/search.template.html'
    });
})();