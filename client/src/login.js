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
            alert('Welcome back!');
          })
          .catch((err) => {
            console.error(err);
            alert('Sorry, there was a problem with your username or password. Remember, they are case sensitive');
          });
      };
    },
  });
