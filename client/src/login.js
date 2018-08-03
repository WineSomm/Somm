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
            swal({
            title: "Welcome Back!",
            icon: "success",
            buttons: false,
            timer: 1500
          });
          let relocate = () => {$window.location.href='/'};
          setTimeout(relocate,1200)
          })
          .catch((err) => {
            console.error(err);
            swal({text:'Sorry, there was a problem with your username or password. Remember, they are case sensitive', icon: "error"});
          });
      };
    },
  });
