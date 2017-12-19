angular.module('app')
  .component('navbar', {
    bindings: {
      wineList: '=',
      selected: '=',
    },
    templateUrl: 'navbar.html',
    controller($scope, $http, $window) {
      this.onClick = (input) => {
        console.log(input);
        const replaced = input.split(' ').join('+');
        $http.get(`https://quiniwine.com/api/pub/wineKeywordSearch/${replaced}`)
          .then((res) => {
            console.log(res);
            this.wineList = res.data.items;
          });
      };
      this.gohome = () => {
        this.selected = null;
        $window.location.href = '/';
      };
      this.favorites = () => {
        $http.get('localhost:9000/favorites')
          .then((res) => {
            this.wineList = res.data;
          });
      };
    },
  });
