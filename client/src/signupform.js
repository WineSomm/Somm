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
            swal('Welcome to SOMM!', 'Your account has been created.');
            let relocate = () => {$window.location.href = '/';}
            setTimeout(relocate, 1500);
            
          })
          .catch((err) => {
            console.error(err);
            swal('Sorry, there was a problem. Please try signing up again.');
          });
      };
    },
  });
