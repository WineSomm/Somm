angular.module('app')
  .component('signupform', {
    templateUrl: '/signupform.html',
    controller($http) {
      this.onClick = (username, password) => {
        console.log(username, password);
        $http.post('/signup', {
          username: username,
          password: password,
        });
      };
    },
  });
