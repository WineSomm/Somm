angular.module('app')
  .service('searchWines', ($http) => {
    this.search = function (req, successCallback) {
      $http({
        async: true,
        crossDomain: true,
        method: 'GET',
        url: 'https://quiniwine.com/api/pub/wineKeywordSearch/',
      })
        .then((res) => {
          successCallback(res);
        }, (res) => {
          console.error(res);
        });
    };
  });
