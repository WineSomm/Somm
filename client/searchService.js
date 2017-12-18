angular.module('app')
  .service('searchWines', function($http) {
    this.search = function(req, successCallback, errorCallback) {
      $http({
        async: true,
        crossDomain: true,
        method: 'GET',
        url: 'https://quiniwine.com/api/pub/wineKeywordSearch/',
      })
      .then(res => {
        successCallback(res);
      }, res => {
        console.error(res);
      });
    };
  });
