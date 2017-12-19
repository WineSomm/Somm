angular.module('app')
  .component('item', {
    bindings: {
      wine: '<',
    },
    templateUrl: 'item.html',
    controller($http) {
      this.favorite = function () {
        $http.post('/favorite', {
          wine: this.wine,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          });
      };
    },
  });
