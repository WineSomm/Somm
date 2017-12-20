angular.module('app')
  .component('item', {
    bindings: {
      wine: '<',
      favoriteView: '<',
    },
    templateUrl: 'item.html',
    controller($http) {
      this.favorite = function () {
        $http.put('/favorite', {
          wine: this.wine,
        })
          .then((res) => {
            console.log('Success!', res);
          })
          .catch((err) => {
            console.error(err);
          });
      };
      this.unfavorite = function () {
        $http({
          method: 'DELETE',
          url: '/favorite',
          data: { wine: this.wine.Name },
          params: { action: 'delete', body: this.wine },
        });
      };
    },
  });
