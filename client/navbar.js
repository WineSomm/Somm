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
        console.log('searching');
        $http.post('/search', {
          wine: replaced,
        })
          .then((res) => {
            console.log(res);
            this.wineList = res.data;
          });
      };
      this.gohome = () => {
        this.favoriteView = false;
        this.selected = null;
        // $window.location.href = '/';
      };
      this.favorites = function () {
        $http.get('/favorite')
          .then(({ data }) => {
            this.selected = null;
            this.wineList = data;
            this.favoriteView = true;
          }, (err) => {
            alert('You have to be logged in to do that');
            console.error(err);
          });
      };
    },
  });
