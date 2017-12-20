angular.module('app')
  .component('signupform', {
    templateUrl: 'templates/signupform.html',
    controller($http, $window) {
      this.onClick = (username, password) => {
        $http.post('/signup', {
          username: username,
          password: password,
        })
          .then((res) => {
            $window.location.href = '/';
            alert('You are now logged in');
          })
          .catch((err) => {
            console.error(err);
          });
      };
    },
  });
