;(() => {
  'use strict';

  let queryStored = '';
  let queryData = '';

  function ImageFactory($http) {
    return {
      getBackdrop: getBackdrop
    };

    function getBackdrop(location) {
      return fetchImages(location).then(data => {
        const photo = data.photos.photo[0];
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      });
    }

    function fetchImages(query = '') {
      if (query === queryStored) {
        return Promise.resolve(queryData.data);
      }

      const config = {
        method: 'GET',
        url: 'https://api.flickr.com/services/rest/',
        params: {
          api_key: '7d540cff9f7437bb78f046f2065b627a',
          method: 'flickr.photos.search',
          nojsoncallback: '1',
          format: 'json',
          sort: 'relevance',
          content_type: '1', // photos only
          tags: query
        }
      };

      return $http(config).then(
        success => {
          queryStored = query;
          queryData = success;
          return success.data;
        },
        fail => fail.data
      );
    }
  }

  ImageFactory.$inject = ['$http'];

  angular
    .module('weatherApp')
    .factory('imageFactory', ImageFactory);
})();