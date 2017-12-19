angular.module('app')
  .component('item', {
    bindings: {
      wine: '<',
    },
    templateUrl: 'item.html',
    controller($http) {
      this.favorite = function () {
        $http.post('localhost:9000/favorites', {
          body: this.wine,
        })
          .then((res) => {
            console.log(res);
          });
      };
    },
  });
