angular.module('app')
  .component('navbar', {
    bindings: {
      wineList: '=',
    },
    templateUrl: 'navbar.html',
    controller($scope, $http) {
      this.onClick = (input) => {
        console.log(input);
        const replaced = input.split(' ').join('+');
        $http.get(`https://quiniwine.com/api/pub/wineKeywordSearch/${replaced}`)
          .then((res) => {
            console.log(res);
            this.wineList = res.data.items;
          });
      };
      this.signUp = () => {
        username = prompt('Choose a username: ');
        window.location.search = `username=${username}`;
      };
      this.login = () => {
        username = prompt('What is your username?');
        window.location.search = `username=${username}`;
      };
    },
  });
