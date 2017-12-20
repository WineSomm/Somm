angular.module('app')
  .component('loginform', {
    templateUrl: 'templates/loginform.html',
    controller($http, $window) {
      this.onClick = (username, password) => {
        $http.post('/login', {
          username: username,
          password: password,
        })
          .then((res) => {
            $window.location.href = '/';
            alert('You are now logged in');
          });
      };
    },
  });
