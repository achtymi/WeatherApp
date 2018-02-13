;(() => {
  'use strict';

  angular
    .module('weatherApp', ['ui.router'])
    .config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider) => {
      $locationProvider.html5Mode(true);
      $stateProvider
        .state('home', {
          url: '/',
          component: 'weather'
        });
    }]);
})();