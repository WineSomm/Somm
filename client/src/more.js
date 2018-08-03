angular.module('app')
  .component('more', {
    templateUrl: 'templates/local.html',
    controller($http, $window) {
      
      this.onClick = ($window) => {
        swal('More Local Shops Loading', '')
        $window.location.href = '../more-local.html'
      }
  }})
  