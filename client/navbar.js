angular.module('app')
  .component('navbar', {
    bindings: {
      wineList: '=',
      selected: '=',
      favoriteView: '=',
    },
    templateUrl: 'navbar.html',
    controller($scope, $http, $window) {
      this.onClick = (input) => {
        this.favoriteView = false;
        const replaced = input.split(' ').join('+');
        $http.get('http://api.snooth.com/wines', {
          params: {
            akey: process.env.API_KEY || window.akey,
            q: replaced,
            n: 25,
          },
        })
          .then((res) => {
            console.log(res.data.wines);
            this.wineList = res.data.wines;
          });
      };
      this.gohome = () => {
        this.favoriteView = false;
        this.selected = null;
        // $window.location.href = '/';
      };
      this.favorites = function () {
        $http.get('/favorite')
          .then((res) => {
            this.selected = null;
            this.wineList = res.data;
            this.favoriteView = true;
          }, (err) => {
            alert('You have to be logged in to do that');
            console.error(err);
          });
      };
    },
  });
