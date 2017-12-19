angular.module('app')
  .component('signupform', {
    templateUrl: '/signupform.html',
    controller($http, $window) {
      this.onClick = (username, password) => {
        $http.post('/signup', {
          username: username,
          password: password,
        })
          .then((res) => {
            $window.location.href = '/';
          })
          .catch((err) => {
            console.error(err);
          });
      };
    },
  });
